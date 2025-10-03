export const calculateDeficit = ({
  bmiSum,
  totalCalories,
  targetCalories,
}: {
  bmiSum: number;
  totalCalories: number;
  targetCalories: number;
}) => {
  const deficitPercentageFromTarget = Math.round(
    totalCalories - targetCalories,
  );
  const deviationFromTarget =
    ((bmiSum - targetCalories) / targetCalories) * 100;

  return {
    deficitPercentageFromTarget,
    deviationFromTarget,
  };
};
