import { bmiCardConfig } from './bmiCardConfig';

export const getBmiCategory = (bmi: number) => {
  const category = bmiCardConfig.find(
    ({ range }) => bmi >= range.min && bmi < range.max,
  );

  return category || bmiCardConfig[0];
};

export const calculateBmiProgress = (bmi: number) => {
  const SHIFT = 10;

  const totalRanges = bmiCardConfig.length;
  const currentRangeIndex = bmiCardConfig.findIndex(
    ({ range }) => bmi >= range.min && bmi < range.max,
  );

  if (currentRangeIndex === -1) return 0;

  // Progress bar in range [SHIFT, 100 - SHIFT]
  const progress =
    SHIFT + (currentRangeIndex / (totalRanges - 1)) * (100 - 2 * SHIFT);

  return progress;
};
