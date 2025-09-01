export const calculateBmi = (height: number, weight: number) => {
  const heightInMeters = height / 100;
  return weight / heightInMeters ** 2;
};
