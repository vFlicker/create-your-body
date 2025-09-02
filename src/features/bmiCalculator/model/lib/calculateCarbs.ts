import { CarbsCalculationParams } from '../bmiCalculatorTypes';
import { calculateLeanBodyMass } from './calculateLeanBodyMass';

export const calculateCarbsByFormula = (
  targetCalories: number,
  proteinCalories: number,
  fatCalories: number,
) => {
  const remainingCalories = targetCalories - proteinCalories - fatCalories;
  const carbsInGrams = Math.max(0, remainingCalories / 4);
  const carbsInKcal = +carbsInGrams * 4;

  return {
    carbsInGrams: +carbsInGrams.toFixed(1),
    carbsInKcal: +carbsInKcal.toFixed(1),
    carbsPercentFromTarget: +((carbsInKcal / targetCalories) * 100).toFixed(1),
  };
};

export const calculateCarbs = ({
  hasExtraWeight,
  targetCalories,
  proteinCalories,
  fatCalories,
  bmi,
  gender,
  age,
  weight,
}: CarbsCalculationParams) => {
  const data = calculateCarbsByFormula(
    targetCalories,
    proteinCalories,
    fatCalories,
  );

  if (!hasExtraWeight) {
    return {
      ...data,
      carbsCoefficient: +(data.carbsInGrams / weight).toFixed(1),
    };
  }

  const { leanBodyMass } = calculateLeanBodyMass({ bmi, gender, age, weight });
  return {
    ...data,
    carbsCoefficient: +(data.carbsInGrams / leanBodyMass).toFixed(1),
  };
};
