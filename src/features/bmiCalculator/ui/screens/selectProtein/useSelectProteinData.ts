import { useMemo } from 'react';

import { useBmiCalculatorStore } from '../../../model/bmiCalculatorStore';
import { useBmiCalculations } from '../../../model/useBmiCalculations';
import { proteinRiskLevel } from './selectProteinConfig';

export const useSelectProteinData = () => {
  const { allCalculatedData, isLoading } = useBmiCalculations();
  const { form } = useBmiCalculatorStore();

  const calculatedData = useMemo(() => {
    if (!allCalculatedData) {
      return null;
    }

    const { proteins, targetCalories } = allCalculatedData;

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
    };
  }, [allCalculatedData, form.proteinRatio]);

  return {
    calculatedData,
    isLoading,
  };
};
