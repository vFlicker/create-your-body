import type { ProteinCalculationParams } from '../bmiCalculatorTypes';
import { calculateLeanBodyMass } from './calculateLeanBodyMass';

const calculateProteinsByFormula = (
  baseWeight: number,
  proteinCoefficient: number,
) => {
  const proteinsInGrams = baseWeight * proteinCoefficient;
  const proteinsInKcal = proteinsInGrams * 4;
  return {
    proteinsInGrams: +proteinsInGrams.toFixed(1),
    proteinsInKcal: +proteinsInKcal.toFixed(1),
  };
};

export const calculateProteins = (params: ProteinCalculationParams) => {
  const { weight, proteinCoefficient, hasExtraWeight, age, bmi, gender } =
    params;

  if (!hasExtraWeight) {
    return calculateProteinsByFormula(weight, proteinCoefficient);
  }

  const { leanBodyMass } = calculateLeanBodyMass(bmi, gender, age, weight);
  return calculateProteinsByFormula(leanBodyMass, proteinCoefficient);
};
