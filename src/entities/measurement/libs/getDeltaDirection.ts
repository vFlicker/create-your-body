export type DeltaDirection = 'positive' | 'negative' | 'neutral';

export const getDeltaDirection = (delta: number): DeltaDirection => {
  if (delta < 0) return 'negative';
  if (delta > 0) return 'positive';
  return 'neutral';
};
