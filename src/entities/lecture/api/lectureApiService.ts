import { httpClient } from '~/shared/api';

import {
  LectureDetailResponse,
  LecturesResponse,
  WeeksResponse,
} from '../lectureTypes';

export const lectureApiService = {
  getLectureWeeks: async () => {
    try {
      const { data } = await httpClient.get<WeeksResponse>(
        `/cms/api/lectures/client-weeks`,
      );

      return data.data;
    } catch (error) {
      console.error('Error fetching lecture weeks:', error);
      throw error;
    }
  },

  getLecturesByWeek: async (week: string) => {
    try {
      const { data } = await httpClient.get<LecturesResponse>(
        `/cms/api/lectures/client-week/${week}`,
      );

      return data.data;
    } catch (error) {
      console.error('Error fetching lecture by week:', error);
      throw error;
    }
  },

  getLectureDetailsById: async (id: string) => {
    try {
      const { data } = await httpClient.get<LectureDetailResponse>(
        `/cms/api/lectures/client/${id}`,
      );

      return data.data;
    } catch (error) {
      console.error('Error fetching lecture details by id:', error);
      throw error;
    }
  },
};
