import { Goal } from '../bmiCalculatorTypes';

const calorieCoefficient = {
  deficit: 0.85,
  maintain: 1,
  surplus: 1.15,
};

/**
 * Calculation of TDEE (total energy consumption)
 */
export const calculateTotalCalories = (
  bmr: number,
  activityCoefficient: number,
) => {
  return bmr * activityCoefficient;
};

export const calculateTargetCalories = (
  goal: Goal,
  activityCoefficient: number,
  bmr: number,
) => {
  const tdee = calculateTotalCalories(bmr, activityCoefficient);
  return Math.round(tdee * calorieCoefficient[goal]);
};
