export const calculateBmi = (weight: number, height: number) => {
  const heightInMeters = height / 100;
  return weight / heightInMeters ** 2;
};
