type NutritionCategory = {
  id: string;
  title: string;
  iconUrl: string;
};

type NutritionPlan = {
  id: string;
  title: string;
  category: string;
  pdfUrl: string;
  iconUrl: string;
};

export type NutritionCategoriesResponse = {
  status: string;
  count: number;
  data: NutritionCategory[];
};

export type NutritionPlanResponse = {
  status: string;
  data: NutritionPlan;
};
