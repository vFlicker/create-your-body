import { useMemo } from 'react';

import { calculateAge, useUser } from '~/entities/user';

import { useBmiCalculatorStore } from '../../../model/bmiCalculatorStore';
import { calculateBmi } from '../../../model/lib/calculateBmi';
import { calculateBmr } from '../../../model/lib/calculateBmr';
import { calculateTargetCalories } from '../../../model/lib/calculateCalories';
import { calculateLeanBodyMass } from '../../../model/lib/calculateLeanBodyMass';
import { calculateProteins } from '../../../model/lib/calculateProteins';
import { proteinRiskLevel } from './selectProteinScreenConfig';

export const useSelectProteinData = () => {
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

    const proteins = calculateProteins({
      weight: form.fullWeight,
      proteinCoefficient: form.proteinRatio,
      hasExtraWeight: form.hasExtraWeight,
      age,
      bmi,
      gender: user.sex,
      height: form.height,
    });

    const proteinKcalPercentage = Math.round(
      (proteins.proteinsInKcal / targetCalories) * 100,
    );

    const riskLevelData =
      proteinRiskLevel.find(({ range }) => {
        const [min, max] = range;
        return min <= form.proteinRatio && max > form.proteinRatio;
      }) ?? proteinRiskLevel[0];

    return {
      proteins,
      proteinKcalPercentage,
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
