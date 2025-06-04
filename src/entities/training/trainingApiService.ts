import { httpClient } from '~/shared/api';

import {
  TrainingDetailResponse,
  TrainingsResponse,
  WeeksResponse,
} from './trainingTypes';

export const trainingApiService = {
  getTrainingWeeks: async (userQuery: string, stream: number) => {
    try {
      const { data } = await httpClient.get<WeeksResponse>(
        `cms/api/workouts/client-weeks?stream=${stream}`,
        { headers: { 'x-telegram-init': userQuery } },
      );

      return data.data;
    } catch (error) {
      console.error('Error fetching training weeks:', error);
      throw error;
    }
  },

  getTrainingsByWeek: async (
    userQuery: string,
    week: number,
    {
      level,
      type,
      stream,
    }: {
      level: string;
      type: string;
      stream: number;
    },
  ) => {
    try {
      const { data } = await httpClient.get<TrainingsResponse>(
        `/cms/api/workouts/client-week/${week}?level=${level}&type=${type}&stream=${stream}`,
        { headers: { 'x-telegram-init': userQuery } },
      );

      return data.data;
    } catch (error) {
      console.error('Error fetching training for week:', error);
      throw error;
    }
  },

  getTrainingDetailsById: async (userQuery: string, trainingId: string) => {
    try {
      const { data } = await httpClient.get<TrainingDetailResponse>(
        `/cms/api/workouts/client/${trainingId}`,
        { headers: { 'x-telegram-init': userQuery } },
      );

      return data.data;
    } catch (error) {
      console.error('Error fetching training details by id:', error);
      throw error;
    }
  },
};
