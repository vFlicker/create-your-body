export const calculateBmi = ({
  height,
  weight,
}: {
  height: number;
  weight: number;
}) => {
  const heightInMeters = height / 100;
  return weight / heightInMeters ** 2;
};
