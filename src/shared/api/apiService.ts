import { httpClient } from './httpClient';

export const apiService = {
  getAllTrainingWeeks: async (userQuery, stream) => {
    try {
      const response = await httpClient.get(
        `cms/api/workouts/client-weeks?stream=${stream}`,
        { headers: { 'x-telegram-init': userQuery } },
      );

      return response;
    } catch (error) {
      console.error('Error fetching training weeks:', error);
      throw error;
    }
  },

  getAllTrainingsByWeek: async (userQuery, week, { level, type, stream }) => {
    try {
      const response = await httpClient.get(
        `/cms/api/workouts/client-week/${week}?level=${level}&type=${type}&stream=${stream}`,
        { headers: { 'x-telegram-init': userQuery } },
      );

      return response;
    } catch (error) {
      console.error('Error fetching training for week:', error);
      throw error;
    }
  },

  getTrainingDetailsById: async (userQuery, trainingId) => {
    try {
      const response = await httpClient.get(
        `/cms/api/workouts/client/${trainingId}`,
        { headers: { 'x-telegram-init': userQuery } },
      );

      return response;
    } catch (error) {
      console.error('Error fetching training details by id:', error);
      throw error;
    }
  },

  getAllLectureWeeks: async (userQuery) => {
    try {
      const response = await httpClient.get(`/cms/api/lectures/client-weeks`, {
        headers: { 'x-telegram-init': userQuery },
      });

      return response;
    } catch (error) {
      console.error('Error fetching lecture weeks:', error);
      throw error;
    }
  },

  getAllLectureByWeek: async (userQuery, week) => {
    try {
      const response = await httpClient.get(
        `/cms/api/lectures/client-week/${week}`,
        { headers: { 'x-telegram-init': userQuery } },
      );

      return response;
    } catch (error) {
      console.error('Error fetching lecture by week:', error);
      throw error;
    }
  },

  getLectureDetailsById: async (userQuery, lectureId) => {
    try {
      const response = await httpClient.get(
        `/cms/api/lectures/client/${lectureId}`,
        { headers: { 'x-telegram-init': userQuery } },
      );

      return response;
    } catch (error) {
      console.error('Error fetching lecture details by id:', error);
      throw error;
    }
  },

  getRecipesCategories: async (userQuery) => {
    try {
      const response = await httpClient.get(
        `/cms/api/recipes/client/categories`,
        {
          headers: { 'x-telegram-init': userQuery },
        },
      );

      return response;
    } catch (error) {
      console.error('Error fetching recipes categories:', error);
      throw error;
    }
  },

  getRecipesByCategoryName: async (userQuery, name, page) => {
    try {
      const response = await httpClient.get(
        `/cms/api/recipes/client/category/${name}?page=${page}`,
        {
          headers: { 'x-telegram-init': userQuery },
        },
      );

      return response;
    } catch (error) {
      console.error('Error fetching recipe by category name:', error);
      throw error;
    }
  },

  getRecipeDetailsById: async (userQuery, recipeId) => {
    try {
      const response = await httpClient.get(
        `/cms/api/recipes/client/${recipeId}`,
        { headers: { 'x-telegram-init': userQuery } },
      );

      return response;
    } catch (error) {
      console.error('Error fetching recipe details by id:', error);
      throw error;
    }
  },

  getNutritionPlanCategories: async (userQuery) => {
    try {
      const response = await httpClient.get(
        `/cms/api/nutrition/client/category/nutrition`,
        { headers: { 'x-telegram-init': userQuery } },
      );
      return response;
    } catch (error) {
      console.error('Error fetching nutrition plan categories:', error);
      throw error;
    }
  },
};
