import { httpClient } from '~/shared/api';

import {
  TrainingDetailResponse,
  TrainingsResponse,
  UpdateWorkoutProgressDto,
  WeeksResponse,
} from '../trainingTypes';

export type TrainingWeekPayload = {
  week: number;
  type: 'home' | 'gym';
  stream: number;
  level?: 'noob' | 'pro';
};

export const trainingApiService = {
  getTrainingWeeks: async (stream: number) => {
    try {
      const { data } = await httpClient.get<WeeksResponse>(
        `cms/api/workouts/client-weeks?stream=${stream}`,
      );

      return data.data;
    } catch (error) {
      console.error('Error fetching training weeks:', error);
      throw error;
    }
  },

  getTrainingsByWeek: async ({
    level,
    stream,
    type,
    week,
  }: TrainingWeekPayload) => {
    try {
      const { data } = await httpClient.get<TrainingsResponse>(
        `/cms/api/workouts/client-week/${week}?level=${level}&type=${type}&stream=${stream}`,
      );

      return data.data;
    } catch (error) {
      console.error('Error fetching training for week:', error);
      throw error;
    }
  },

  getTrainingDetailsById: async (trainingId: string) => {
    try {
      const { data } = await httpClient.get<TrainingDetailResponse>(
        `/cms/api/workouts/client/${trainingId}`,
      );

      return data.data;
    } catch (error) {
      console.error('Error fetching training details by id:', error);
      throw error;
    }
  },

  updateWorkoutProgress: async ({ dto }: { dto: UpdateWorkoutProgressDto }) => {
    try {
      const response = await httpClient.post(
        `/v2/api/client/workout-progress`,
        dto,
      );
      return response;
    } catch (error) {
      console.error('Error updating workout progress:', error);
      throw error;
    }
  },
};
