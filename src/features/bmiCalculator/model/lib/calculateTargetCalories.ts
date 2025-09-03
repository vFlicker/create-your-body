import { Goal } from '../bmiCalculatorTypes';

const calorieCoefficient = {
  maintain: 1,
  surplus: 1.15,
};

const calculateTotalCalories = (bmr: number, activityCoefficient: number) => {
  return bmr * activityCoefficient;
};

const calculateDeficitCoefficient = (deficitPercent: number) => {
  return (100 - deficitPercent) / 100;
};

export const calculateTargetCalories = ({
  goal,
  activityCoefficient,
  bmr,
  deficitPercent,
}: {
  goal: Goal;
  activityCoefficient: number;
  bmr: number;
  deficitPercent: number;
}) => {
  const tdee = calculateTotalCalories(bmr, activityCoefficient);

  if (goal === 'deficit') {
    const deficitCoefficient = calculateDeficitCoefficient(deficitPercent);
    return Math.round(tdee * deficitCoefficient);
  }

  return Math.round(tdee * calorieCoefficient[goal]);
};
