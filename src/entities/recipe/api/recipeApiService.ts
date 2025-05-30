import { httpClient } from '~/shared/api';

export const recipeApiService = {
  getRecipesCategories: async (userQuery: string) => {
    try {
      const { data } = await httpClient.get(
        `/cms/api/recipes/client/categories`,
        {
          headers: { 'x-telegram-init': userQuery },
        },
      );

      return data;
    } catch (error) {
      console.error('Error fetching recipes categories:', error);
      throw error;
    }
  },

  getRecipesByCategoryName: async (
    userQuery: string,
    name: string,
    page: string,
  ) => {
    try {
      const { data } = await httpClient.get(
        `/cms/api/recipes/client/category/${name}?page=${page}`,
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

  getRecipeDetailsById: async (userQuery: string, recipeId: string) => {
    try {
      const { data } = await httpClient.get(
        `/cms/api/recipes/client/${recipeId}`,
        { headers: { 'x-telegram-init': userQuery } },
      );

      return data;
    } catch (error) {
      console.error('Error fetching recipe details by id:', error);
      throw error;
    }
  },
};
