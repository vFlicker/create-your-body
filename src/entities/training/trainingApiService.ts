import { httpClient } from '~/shared/api';

export const trainingApiService = {
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
};
