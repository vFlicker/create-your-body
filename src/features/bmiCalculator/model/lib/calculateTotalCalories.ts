export const calculateTotalCalories = ({
  bmr,
  activityCoefficient,
}: {
  bmr: number;
  activityCoefficient: number;
}) => {
  return bmr * activityCoefficient;
};
