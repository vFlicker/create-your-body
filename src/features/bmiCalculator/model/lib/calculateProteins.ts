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

export const calculateProteins = ({
  fullWeight,
  proteinCoefficient,
  hasExtraWeight,
  age,
  bmi,
  gender,
}: {
  fullWeight: number;
  proteinCoefficient: number;
  hasExtraWeight: boolean;
  age: number;
  bmi: number;
  gender: 'male' | 'female';
}) => {
  if (!hasExtraWeight) {
    const result = calculateProteinsByFormula(fullWeight, proteinCoefficient);
    return result;
  }

  const { leanBodyMass } = calculateLeanBodyMass(bmi, gender, age, fullWeight);
  const result = calculateProteinsByFormula(leanBodyMass, proteinCoefficient);
  return result;
};
