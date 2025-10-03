import type { FatCalculationParams } from '../bmiCalculatorTypes';
import { calculateLeanBodyMass } from './calculateLeanBodyMass';

const calculateFatsByFormula = (
  baseWeight: number,
  fatCoefficient: number,
  targetCalories: number,
) => {
  const fatsInGrams = baseWeight * fatCoefficient;
  const fatsInKcal = fatsInGrams * 9;

  return {
    fatsInGrams: Math.floor(fatsInGrams),
    fatsInKcal: Math.floor(fatsInKcal),
    fatsPercentFromTarget: Math.floor((fatsInKcal / targetCalories) * 100),
  };
};

export const calculateFats = ({
  weight,
  fatCoefficient,
  hasExtraWeight,
  age,
  bmi,
  gender,
  targetCalories,
}: FatCalculationParams) => {
  if (!hasExtraWeight) {
    return calculateFatsByFormula(weight, fatCoefficient, targetCalories);
  }

  const { leanBodyMass } = calculateLeanBodyMass({ bmi, gender, age, weight });
  return calculateFatsByFormula(leanBodyMass, fatCoefficient, targetCalories);
};
