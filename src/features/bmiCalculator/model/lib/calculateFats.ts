import type { FatCalculationParams } from '../bmiCalculatorTypes';
import { calculateLeanBodyMass } from './calculateLeanBodyMass';

const calculateFatsByFormula = (baseWeight: number, fatCoefficient: number) => {
  const fatsInGrams = baseWeight * fatCoefficient;
  const fatsInKcal = fatsInGrams * 9;
  return {
    fatsInGrams: +fatsInGrams.toFixed(1),
    fatsInKcal: +fatsInKcal.toFixed(1),
  };
};

export const calculateFats = (params: FatCalculationParams) => {
  const { weight, fatCoefficient, hasExtraWeight, age, bmi, gender } = params;

  if (!hasExtraWeight) {
    return calculateFatsByFormula(weight, fatCoefficient);
  }

  const { leanBodyMass } = calculateLeanBodyMass(bmi, gender, age, weight);
  return calculateFatsByFormula(leanBodyMass, fatCoefficient);
};
