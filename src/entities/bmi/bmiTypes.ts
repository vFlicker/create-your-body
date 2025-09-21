export type Bmi = {
  userId: number;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
  updatedAt: string;
};

export type CreateBmiDto = {
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
  imt: number;
  bmr: number;
  tdee: number;
  weight: number;
  height: number;
  deficit: number;
};

export type GetBmiResponse = {
  success: boolean;
  message: string;
  data: Bmi;
};
