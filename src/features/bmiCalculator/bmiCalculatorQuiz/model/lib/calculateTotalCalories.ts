export const calculateTotalCalories = ({
  bmr,
  activityCoefficient,
}: {
  bmr: number;
  activityCoefficient: number;
}) => {
  return Math.round(bmr * activityCoefficient);
};
