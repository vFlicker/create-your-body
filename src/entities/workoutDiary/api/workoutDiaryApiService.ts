import { httpClient } from '~/shared/api/httpClient';

import {
  CreateWorkoutReportDto,
  GetExercisesResponse,
  GetWorkoutReportsResponse,
  RemoveWorkoutReportDto,
} from '../workoutDiaryTypes';

export const workoutDiaryApiService = {
  createWorkoutReport: async ({ dto }: { dto: CreateWorkoutReportDto }) => {
    try {
      const { data } = await httpClient.post(
        '/v2/api/client/user/workout-diary',
        dto,
      );
      return data;
    } catch (error) {
      console.error('Error creating workout report:', error);
      throw error;
    }
  },

  getWorkoutReports: async () => {
    try {
      const { data } = await httpClient.get<GetWorkoutReportsResponse>(
        '/v2/api/client/user/workout-diary',
      );
      return data.data;
    } catch (error) {
      console.error('Error fetching workout reports:', error);
      throw error;
    }
  },

  removeWorkoutReport: async ({ dto }: { dto: RemoveWorkoutReportDto }) => {
    try {
      await httpClient.delete(`/v2/api/client/user/workout-diary/${dto.id}`);
    } catch (error) {
      console.error('Error removing workout report:', error);
      throw error;
    }
  },

  getExercises: async (search?: string) => {
    try {
      const params = search ? { search } : {};
      const { data } = await httpClient.get<GetExercisesResponse>(
        `/v2/api/client/exercises`,
        { params },
      );
      return data.data.exercises;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },
};
