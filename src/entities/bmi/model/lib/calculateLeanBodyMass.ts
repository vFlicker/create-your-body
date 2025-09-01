const BMR_LEAN_MASS_PERCENTAGES = {
  highBMI: {
    male: { min: 0.6, max: 0.65 },
    female: { min: 0.55, max: 0.6 },
  },
  moderateBMI: {
    male: { min: 0.7, max: 0.75 },
    female: { min: 0.65, max: 0.7 },
  },
  mildBMI: {
    male: { min: 0.8, max: 0.85 },
    female: { min: 0.75, max: 0.8 },
  },
};

const getLeanMassPercentForOverweight = (
  bmi: number,
  gender: 'male' | 'female',
) => {
  let range = null;

  if (bmi >= 35) range = BMR_LEAN_MASS_PERCENTAGES.highBMI[gender];
  else if (bmi >= 30) range = BMR_LEAN_MASS_PERCENTAGES.moderateBMI[gender];
  else range = BMR_LEAN_MASS_PERCENTAGES.mildBMI[gender];

  return (range.min + range.max) / 2;
};

const getLeanMassPercentForNormalWeight = (
  bmi: number,
  gender: 'male' | 'female',
  age: number,
) => {
  if (bmi < 18) {
    // Underweight
    const fatPercent = gender === 'male' ? 9 : 13;
    return { leanBodyMassPercent: 1 - fatPercent / 100, fatPercent };
  }

  if (bmi < 23 && age < 35) {
    // Young and slim
    const fatPercent = gender === 'male' ? 11 : 15;
    return { leanBodyMassPercent: 1 - fatPercent / 100, fatPercent };
  }

  // Other normal BMI cases
  const sexCoefficient = gender === 'male' ? 1 : 0;
  const estimatedFat = 1.2 * bmi + 0.23 * age - 10.8 * sexCoefficient - 5.4;
  const fatPercent = Math.max(8, Math.min(estimatedFat, 25));
  const leanBodyMassPercent = Math.max(0.75, 1 - fatPercent / 100);

  return { leanBodyMassPercent, fatPercent };
};

export const calculateLeanBodyMass = (
  bmi: number,
  gender: 'male' | 'female',
  age: number,
  weight: number,
) => {
  let leanBodyMassPercent: number;
  let fatPercent: number | undefined;

  if (bmi >= 25) {
    leanBodyMassPercent = getLeanMassPercentForOverweight(bmi, gender);
  } else {
    const result = getLeanMassPercentForNormalWeight(bmi, gender, age);
    leanBodyMassPercent = result.leanBodyMassPercent;
    fatPercent = result.fatPercent;
  }

  return {
    leanBodyMass: weight * leanBodyMassPercent,
    fatPercent,
  };
};
