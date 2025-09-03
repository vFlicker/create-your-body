export const calculateDeficit = ({
  bmiSum,
  targetCalories,
}: {
  bmiSum: number;
  targetCalories: number;
}) => {
  const deficitCalories = Math.round(bmiSum - targetCalories);
  const deficitPercentageFromTarget = (deficitCalories / targetCalories) * 100;

  return {
    deficitCalories,
    deficitPercentageFromTarget,
  };
};
