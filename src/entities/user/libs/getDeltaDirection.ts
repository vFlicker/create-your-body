export type DeltaDirection = 'positive' | 'negative' | 'noChange';

export const signIndicator = {
  negative: '-',
  positive: '+',
};

export const getDeltaDirection = (delta: number): DeltaDirection => {
  if (delta < 0) return 'negative';
  if (delta > 0) return 'positive';
  return 'noChange';
};
