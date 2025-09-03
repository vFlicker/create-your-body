export const calculateDeficit = ({
  totalCalories,
  targetCalories,
}: {
  totalCalories: number;
  targetCalories: number;
}) => {
  const deficitCalories = Math.round(totalCalories - targetCalories);

  const deficitPercentageFromTarget = (deficitCalories / targetCalories) * 100;
  return {
    deficitCalories,
    deficitPercentageFromTarget,
  };
};
