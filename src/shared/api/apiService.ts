import {
  addUserParametersAdapter,
  getUserAdapter,
  getUserParametersAdapter,
  updateUserAdapter,
  updateUserParametersAdapter,
} from './dataAdapter';
import { httpClient } from './httpClient';

export const apiService = {
  getUser: async (userQuery) => {
    try {
      const { data } = await httpClient.get(
        `/v2/api/client/user/me?${userQuery}`,
      );
      const adaptedUser = getUserAdapter(data.data);
      return adaptedUser;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  updateUser: async (userQuery, userData) => {
    try {
      const adaptedUserData = updateUserAdapter(userData);
      const response = await httpClient.patch(
        `/v2/api/client/user/me?${userQuery}`,
        adaptedUserData,
      );
      return response;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  getUserTransformationPhoto: async (userQuery) => {
    try {
      const response = await httpClient.get(
        `/v2/api/client/user/photos?${userQuery}`,
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching user photo transformation:', error);
      throw error;
    }
  },

  /**
   * @param {string} userQuery
   * @param {FormData} formData
   * @param {'after' | 'before'} stage
   */
  updateUserTransformationPhoto: async (userQuery, formData, stage) => {
    try {
      const response = await httpClient.post(
        `/v2/api/client/user/photos/${stage}?${userQuery}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return response;
    } catch (error) {
      console.error('Error updating user photo transformation:', error);
      throw error;
    }
  },

  addUserBodyParameters: async (userQuery, parameters) => {
    try {
      const adaptedParameters = addUserParametersAdapter(parameters);
      const response = await httpClient.post(
        `/v2/api/client/user/measurements?${userQuery}`,
        adaptedParameters,
      );
      return response;
    } catch (error) {
      console.error('Error adding user parameters:', error);
      throw error;
    }
  },

  getUserParameters: async (userQuery) => {
    try {
      const response = await httpClient.get(
        `/v2/api/client/user/measurements?${userQuery}`,
      );
      const adaptedUserParameters = getUserParametersAdapter(
        response.data.data.measurements,
      );
      return adaptedUserParameters;
    } catch (error) {
      console.error('Error fetching user parameters:', error);
      throw error;
    }
  },

  updateUserBodyParameters: async (userQuery, id, parameters) => {
    try {
      const adaptedParameters = updateUserParametersAdapter(parameters);
      const response = await httpClient.put(
        `/v2/api/client/user/measurements/${id}?${userQuery}`,
        adaptedParameters,
      );
      return response;
    } catch (error) {
      console.error('Error updating user parameters:', error);
      throw error;
    }
  },

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

  getNutritionPlanByPdfId: async (userQuery, userId, pdfId) => {
    try {
      const response = await httpClient.get(
        `/cms/api/nutrition/client/${pdfId}?tg_id=${userId}`,
        { headers: { 'x-telegram-init': userQuery } },
      );

      return response;
    } catch (error) {
      console.error('Error fetching nutrition plan by ID with PDF:', error);
      throw error;
    }
  },
};
