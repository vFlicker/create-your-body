import type { ProteinCalculationParams } from '../bmiCalculatorTypes';
import { calculateLeanBodyMass } from './calculateLeanBodyMass';

const calculateProteinsByFormula = (
  baseWeight: number,
  proteinCoefficient: number,
  targetCalories: number,
) => {
  const proteinsInGrams = baseWeight * proteinCoefficient;
  const proteinsInKcal = proteinsInGrams * 4;

  return {
    proteinsInGrams: Math.floor(proteinsInGrams),
    proteinsInKcal: Math.floor(proteinsInKcal),
    proteinsPercentFromTarget: Math.floor(
      (proteinsInKcal / targetCalories) * 100,
    ),
  };
};

export const calculateProteins = ({
  weight,
  proteinCoefficient,
  hasExtraWeight,
  age,
  bmi,
  gender,
  targetCalories,
}: ProteinCalculationParams) => {
  if (!hasExtraWeight) {
    return calculateProteinsByFormula(
      weight,
      proteinCoefficient,
      targetCalories,
    );
  }

  const { leanBodyMass } = calculateLeanBodyMass({ bmi, gender, age, weight });
  return calculateProteinsByFormula(
    leanBodyMass,
    proteinCoefficient,
    targetCalories,
  );
};
