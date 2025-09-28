export type Goal = 'deficit' | 'maintain' | 'surplus';

export type ProteinCalculationParams = {
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  bmi: number;
  proteinCoefficient: number;
  hasExtraWeight: boolean;
  targetCalories: number;
};

export type FatCalculationParams = {
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  bmi: number;
  fatCoefficient: number;
  hasExtraWeight: boolean;
  targetCalories: number;
};

export type CarbsCalculationParams = {
  hasExtraWeight: boolean;
  targetCalories: number;
  proteinCalories: number;
  fatCalories: number;
  bmi: number;
  gender: 'male' | 'female';
  age: number;
  weight: number;
};

export type BmrCalculationParams = {
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  bmi: number;
  leanBodyMass: number;
};
