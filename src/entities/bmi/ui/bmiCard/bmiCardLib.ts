import { bmiCardConfig } from './bmiCardConfig';

export const getBmiCategory = (bmi: number) => {
  const category = bmiCardConfig.find(
    ({ range }) => bmi >= range.min && bmi < range.max,
  );

  return category || bmiCardConfig[0];
};

export const calculateBmiProgress = (bmi: number) => {
  const totalRanges = bmiCardConfig.length;
  const currentRangeIndex = bmiCardConfig.findIndex(
    ({ range }) => bmi >= range.min && bmi < range.max,
  );

  if (currentRangeIndex === -1) return 0;

  const progress = (currentRangeIndex / (totalRanges - 1)) * 100;
  return progress;
};
