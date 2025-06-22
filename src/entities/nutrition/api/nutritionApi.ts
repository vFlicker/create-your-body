import { httpClient } from '~/shared/api';

import {
  NutritionCategoriesResponse,
  NutritionPlanResponse,
} from '../nutritionTypes';

export const nutritionApiService = {
  getNutritionCategories: async () => {
    try {
      const { data } = await httpClient.get<NutritionCategoriesResponse>(
        `/cms/api/nutrition/client/category/nutrition`,
      );
      return data.data;
    } catch (error) {
      console.error('Error fetching nutrition plan categories:', error);
      throw error;
    }
  },

  getNutritionPlan: async (userId: number, categoryId: string) => {
    try {
      const { data } = await httpClient.get<NutritionPlanResponse>(
        `/cms/api/nutrition/client/${categoryId}?tg_id=${userId}`,
      );

      return data;
    } catch (error) {
      console.error('Error fetching nutrition plan by ID:', error);
      throw error;
    }
  },
};
