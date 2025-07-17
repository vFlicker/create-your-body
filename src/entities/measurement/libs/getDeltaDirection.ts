export type DeltaDirection = 'up' | 'down' | 'same';

export const getDeltaDirection = (delta: number): DeltaDirection => {
  if (delta < 0) return 'down';
  if (delta > 0) return 'up';
  return 'same';
};
