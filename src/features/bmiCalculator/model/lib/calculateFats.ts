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
    fatsInGrams: +fatsInGrams.toFixed(1),
    fatsInKcal: +fatsInKcal.toFixed(1),
    fatsPercentFromTarget: +((fatsInKcal / targetCalories) * 100).toFixed(1),
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
