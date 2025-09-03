import { CarbsCalculationParams } from '../bmiCalculatorTypes';
import { calculateLeanBodyMass } from './calculateLeanBodyMass';

export const calculateCarbsByFormula = (
  targetCalories: number,
  proteinCalories: number,
  fatCalories: number,
) => {
  const remainingCalories = targetCalories - proteinCalories - fatCalories;
  const carbsInGrams = Math.max(30, remainingCalories / 4);
  const carbsInKcal = +carbsInGrams * 4;

  return {
    carbsInGrams: Math.floor(carbsInGrams),
    carbsInKcal: Math.floor(carbsInKcal),
    carbsPercentFromTarget: Math.floor((carbsInKcal / targetCalories) * 100),
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
