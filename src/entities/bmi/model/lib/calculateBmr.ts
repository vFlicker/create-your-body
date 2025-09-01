const calculateBaseBmr = (
  gender: 'male' | 'female',
  age: number,
  height: number,
  weight: number,
) => {
  const result =
    gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  return Math.round(result);
};

export const calculateBmr = ({
  bmi,
  gender,
  age,
  height,
  weight,
  leanBodyMass,
}: {
  bmi: number;
  gender: 'male' | 'female';
  age: number;
  height: number;
  weight: number;
  leanBodyMass: number;
}) => {
  const bmrFullWeight = calculateBaseBmr(gender, age, height, weight);
  const bmrLeanMass = calculateBaseBmr(gender, age, height, leanBodyMass);
  if (bmi >= 25) return bmrLeanMass;
  return bmrFullWeight;
};
