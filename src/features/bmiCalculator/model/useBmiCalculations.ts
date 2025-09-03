import { useMemo } from 'react';

import { useBmiCalculatorStore } from './bmiCalculatorStore';
import { calculateCarbs } from './lib/calculateCarbs';
import { calculateFats } from './lib/calculateFats';
import { calculateProteins } from './lib/calculateProteins';
import { calculateTargetCalories } from './lib/calculateTargetCalories';
import { useBaseBmiCalculations } from './useBaseBmiCalculations';

export const useBmiCalculations = () => {
  const { form } = useBmiCalculatorStore();
  const { baseCalculatedData, isLoading } = useBaseBmiCalculations();

  const allCalculatedData = useMemo(() => {
    if (
      !baseCalculatedData ||
      !form.activityCoefficient ||
      !form.goal ||
      !form.fullWeight ||
      !form.height
    ) {
      return null;
    }

    const { age, bmi, bmr, gender } = baseCalculatedData;

    const targetCalories = calculateTargetCalories({
      goal: form.goal,
      activityCoefficient: form.activityCoefficient,
      bmr,
      deficitPercent: form.deficitPercent,
    });

    const proteins = calculateProteins({
      weight: form.fullWeight,
      height: form.height,
      proteinCoefficient: form.proteinRatio,
      hasExtraWeight: form.hasExtraWeight,
      age,
      bmi,
      gender,
      targetCalories,
    });

    const fats = calculateFats({
      weight: form.fullWeight,
      height: form.height,
      fatCoefficient: form.fatRatio,
      hasExtraWeight: form.hasExtraWeight,
      age,
      bmi,
      gender,
      targetCalories,
    });

    const carbs = calculateCarbs({
      weight: form.fullWeight,
      hasExtraWeight: form.hasExtraWeight,
      age,
      bmi,
      gender,
      fatCalories: fats.fatsInKcal,
      proteinCalories: proteins.proteinsInKcal,
      targetCalories,
    });

    return {
      ...baseCalculatedData,
      targetCalories,
      proteins,
      fats,
      carbs,
    };
  }, [baseCalculatedData, form]);

  return {
    allCalculatedData,
    isLoading: isLoading || !allCalculatedData,
  };
};
