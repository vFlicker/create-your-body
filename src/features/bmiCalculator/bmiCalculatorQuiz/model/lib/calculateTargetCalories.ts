import { Goal } from '../bmiCalculatorTypes';

const calorieCoefficient = {
  maintain: 1,
  surplus: 1.15,
};

const calculateDeficitCoefficient = (deficitPercent: number) => {
  return (100 - deficitPercent) / 100;
};

export const calculateTargetCalories = ({
  goal,
  totalCalories,
  deficitPercent,
}: {
  goal: Goal;
  totalCalories: number;
  deficitPercent: number;
}) => {
  if (goal === 'deficit') {
    const deficitCoefficient = calculateDeficitCoefficient(deficitPercent);
    return Math.round(totalCalories * deficitCoefficient);
  }

  return Math.round(totalCalories * calorieCoefficient[goal]);
};
