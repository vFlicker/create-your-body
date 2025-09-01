import { useMemo } from 'react';

import { calculateAge, useUser } from '~/entities/user';

import { useBmiCalculatorStore } from '../../../model/bmiCalculatorStore';
import { calculateBmi } from '../../../model/lib/calculateBmi';
import { calculateBmr } from '../../../model/lib/calculateBmr';
import { calculateTargetCalories } from '../../../model/lib/calculateCalories';
import { calculateFats } from '../../../model/lib/calculateFats';
import { calculateLeanBodyMass } from '../../../model/lib/calculateLeanBodyMass';
import { fatRiskLevel } from './selectFatConfig';

export const useSelectFatData = () => {
  const { form } = useBmiCalculatorStore();
  const { user, isUserPending } = useUser();

  const calculatedData = useMemo(() => {
    if (
      !user ||
      !form.height ||
      !form.fullWeight ||
      !form.activityCoefficient ||
      !form.goal
    ) {
      return null;
    }

    const age = calculateAge(user.bornDate);
    const bmi = calculateBmi(form.height, form.fullWeight);

    const { leanBodyMass } = calculateLeanBodyMass(
      bmi,
      user.sex,
      age,
      form.fullWeight,
    );

    const bmr = calculateBmr({
      bmi,
      gender: user.sex,
      age,
      height: form.height,
      weight: form.fullWeight,
      leanBodyMass,
    });

    const targetCalories = calculateTargetCalories(
      form.goal,
      form.activityCoefficient,
      bmr,
    );

    const fats = calculateFats({
      weight: form.fullWeight,
      fatCoefficient: form.fatRatio,
      hasExtraWeight: form.hasExtraWeight,
      age,
      bmi,
      gender: user.sex,
      height: form.height,
    });

    const fatKcalPercentage = Math.round(
      (fats.fatsInKcal / targetCalories) * 100,
    );

    const riskLevelData =
      fatRiskLevel.find(({ range }) => {
        const [min, max] = range;
        return min <= form.fatRatio && max > form.fatRatio;
      }) ?? fatRiskLevel[0];

    return {
      fats,
      fatKcalPercentage,
      riskLevelData,
      userAge: age,
      userBmi: bmi,
      leanBodyMass,
      bmr,
      targetCalories,
    };
  }, [user, form]);

  return {
    calculatedData,
    isLoading: isUserPending || !user,
  };
};
