import { httpClient } from '~/shared/api';

export const lectureApiService = {
  getAllLectureWeeks: async (userQuery: string) => {
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

  getAllLectureByWeek: async (userQuery: string, week) => {
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

  getLectureDetailsById: async (userQuery: string, lectureId) => {
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
};
