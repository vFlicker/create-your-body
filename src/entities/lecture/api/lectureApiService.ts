import { httpClient } from '~/shared/api';

import {
  LectureDetailResponse,
  LecturesResponse,
  WeeksResponse,
} from '../lectureTypes';

export const lectureApiService = {
  getAllWeeks: async (userQuery: string) => {
    try {
      const { data } = await httpClient.get<WeeksResponse>(
        `/cms/api/lectures/client-weeks`,
        {
          headers: { 'x-telegram-init': userQuery },
        },
      );

      return data.data;
    } catch (error) {
      console.error('Error fetching lecture weeks:', error);
      throw error;
    }
  },

  getAllLecturesByWeek: async (userQuery: string, week: number) => {
    try {
      const { data } = await httpClient.get<LecturesResponse>(
        `/cms/api/lectures/client-week/${week}`,
        { headers: { 'x-telegram-init': userQuery } },
      );

      return data.data;
    } catch (error) {
      console.error('Error fetching lecture by week:', error);
      throw error;
    }
  },

  getLectureDetailsById: async (userQuery: string, id: string) => {
    try {
      const { data } = await httpClient.get<LectureDetailResponse>(
        `/cms/api/lectures/client/${id}`,
        {
          headers: { 'x-telegram-init': userQuery },
        },
      );

      return data.data;
    } catch (error) {
      console.error('Error fetching lecture details by id:', error);
      throw error;
    }
  },
};
