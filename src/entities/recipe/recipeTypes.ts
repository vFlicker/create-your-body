export type RecipeCategory = {
  name: string;
};

export type Recipe = {
  id: string;
  title: string;
};

type RecipeDetails = {
  image: {
    fileId: string;
    fileName: string;
    originalName: string;
    url: string;
    size: number;
  };
  nutrition: {
    calories: number;
    proteins: number;
    fats: number;
    carbs: number;
  };
  title: string;
  category: string;
  ingredients: {
    name: string;
    amount: string;
  }[];
  steps: {
    description: string;
  }[];
  status: string;
  order: number;
  comments: string;
  updatedAt: string;
  ingredientsCount: number;
  stepsCount: number;
  id: string;
};

export type RecipeCategoriesResponse = {
  status: string;
  data: RecipeCategory[];
};

export type RecipesResponse = {
  status: string;
  data: Recipe[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type RecipeDetailsResponse = {
  status: string;
  data: RecipeDetails;
};
