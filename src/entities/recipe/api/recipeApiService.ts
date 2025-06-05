import { httpClient } from '~/shared/api';

import {
  RecipeCategoriesResponse,
  RecipeDetailsResponse,
  RecipesResponse,
} from '../recipeTypes';

export const recipeApiService = {
  getRecipeCategories: async (userQuery: string) => {
    try {
      const { data } = await httpClient.get<RecipeCategoriesResponse>(
        `/cms/api/recipes/client/categories`,
        {
          headers: { 'x-telegram-init': userQuery },
        },
      );

      return data.data;
    } catch (error) {
      console.error('Error fetching recipes categories:', error);
      throw error;
    }
  },

  getRecipesByCategory: async (
    userQuery: string,
    category: string,
    page: number,
  ) => {
    try {
      const { data } = await httpClient.get<RecipesResponse>(
        `/cms/api/recipes/client/category/${category}?page=${page}`,
        {
          headers: { 'x-telegram-init': userQuery },
        },
      );

      return data;
    } catch (error) {
      console.error('Error fetching recipe by category name:', error);
      throw error;
    }
  },

  getRecipeDetailsById: async (userQuery: string, id: string) => {
    try {
      const { data } = await httpClient.get<RecipeDetailsResponse>(
        `/cms/api/recipes/client/${id}`,
        {
          headers: { 'x-telegram-init': userQuery },
        },
      );

      return data.data;
    } catch (error) {
      console.error('Error fetching recipe details by id:', error);
      throw error;
    }
  },
};
