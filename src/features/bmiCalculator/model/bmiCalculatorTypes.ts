export type Goal = 'deficit' | 'maintain' | 'surplus';

export type ProteinCalculationParams = {
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  bmi: number;
  proteinCoefficient: number;
  hasExtraWeight: boolean;
};

export type BmrCalculationParams = {
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  bmi: number;
  leanBodyMass: number;
};
