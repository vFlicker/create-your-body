import { httpClient } from '~/shared/api';

import {
  RecipeCategoriesResponse,
  RecipeDetailsResponse,
  RecipesResponse,
} from '../recipeTypes';

export const recipeApiService = {
  getRecipeCategories: async () => {
    try {
      const { data } = await httpClient.get<RecipeCategoriesResponse>(
        `/cms/api/recipes/client/categories`,
      );

      return data.data;
    } catch (error) {
      console.error('Error fetching recipes categories:', error);
      throw error;
    }
  },

  getRecipesByCategory: async (category: string, page: number) => {
    try {
      const { data } = await httpClient.get<RecipesResponse>(
        `/cms/api/recipes/client/category/${category}?page=${page}`,
      );

      return data;
    } catch (error) {
      console.error('Error fetching recipe by category name:', error);
      throw error;
    }
  },

  getRecipeDetailsById: async (id: string) => {
    try {
      const { data } = await httpClient.get<RecipeDetailsResponse>(
        `/cms/api/recipes/client/${id}`,
      );

      return data.data;
    } catch (error) {
      console.error('Error fetching recipe details by id:', error);
      throw error;
    }
  },
};
