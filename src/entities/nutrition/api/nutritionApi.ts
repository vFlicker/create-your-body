import { httpClient } from '~/shared/api';

import {
  NutritionCategoriesResponse,
  NutritionPlanResponse,
} from '../nutritionTypes';

export const nutritionApiService = {
  getNutritionCategories: async (userQuery: string) => {
    try {
      const { data } = await httpClient.get<NutritionCategoriesResponse>(
        `/cms/api/nutrition/client/category/nutrition`,
        { headers: { 'x-telegram-init': userQuery } },
      );
      return data;
    } catch (error) {
      console.error('Error fetching nutrition plan categories:', error);
      throw error;
    }
  },

  getNutritionPlanByPdfId: async (
    userQuery: string,
    userId: number,
    pdfId: string,
  ) => {
    try {
      const { data } = await httpClient.get<NutritionPlanResponse>(
        `/cms/api/nutrition/client/${pdfId}?tg_id=${userId}`,
        { headers: { 'x-telegram-init': userQuery } },
      );

      return data;
    } catch (error) {
      console.error('Error fetching nutrition plan by ID with PDF:', error);
      throw error;
    }
  },
};
