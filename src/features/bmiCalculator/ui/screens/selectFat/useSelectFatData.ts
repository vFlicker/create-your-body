import { useMemo } from 'react';

import { useBmiCalculatorStore } from '../../../model/bmiCalculatorStore';
import { useBmiCalculations } from '../../../model/useBmiCalculations';
import { fatRiskLevel } from './selectFatConfig';

export const useSelectFatData = () => {
  const { allCalculatedData, isLoading } = useBmiCalculations();
  const { form } = useBmiCalculatorStore();

  const calculatedData = useMemo(() => {
    if (!allCalculatedData) {
      return null;
    }

    const { fats, targetCalories } = allCalculatedData;

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
    };
  }, [allCalculatedData, form.fatRatio]);

  return {
    calculatedData,
    isLoading,
  };
};
