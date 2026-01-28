import { httpClient } from '~/shared/api/httpClient';

import {
  AddFromProgramDto,
  AddFromProgramResponse,
  CreateWorkoutReportDto,
  GetExerciseHistoryResponse,
  GetExercisesResponse,
  GetProgramWorkoutResponse,
  GetWorkoutReportResponse,
  GetWorkoutReportsGroupedByDateResponse,
  GetWorkoutReportsResponse,
  RemoveWorkoutReportDto,
  UpdateWorkoutReportDto,
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

  getWorkoutReport: async (id: number) => {
    try {
      const { data } = await httpClient.get<GetWorkoutReportResponse>(
        `/v2/api/client/user/workout-diary/${id}`,
      );
      return data.data.workoutDiary;
    } catch (error) {
      console.error('Error fetching workout report:', error);
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

  getWorkoutReportsGroupedByDate: async () => {
    try {
      const { data } =
        await httpClient.get<GetWorkoutReportsGroupedByDateResponse>(
          '/v2/api/client/user/workout-diary/weeks',
        );

      return data.data;
    } catch (error) {
      console.error('Error fetching workout reports grouped by date:', error);
      throw error;
    }
  },

  updateWorkoutReport: async ({
    id,
    dto,
  }: {
    id: number;
    dto: UpdateWorkoutReportDto;
  }) => {
    try {
      const { data } = await httpClient.put(
        `/v2/api/client/user/workout-diary/${id}`,
        dto,
      );
      return data;
    } catch (error) {
      console.error('Error updating workout report:', error);
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

  getApproachesHistory: async (exerciseId: number) => {
    try {
      const { data } = await httpClient.get<GetExerciseHistoryResponse>(
        `/v2/api/client/user/exercise-history/${exerciseId}`,
      );
      return data.data;
    } catch (error) {
      console.error('Error fetching exercise history:', error);
      throw error;
    }
  },

  addFromProgram: async ({ dto }: { dto: AddFromProgramDto }) => {
    try {
      const { data } = await httpClient.post<AddFromProgramResponse>(
        '/v2/api/client/user/workout-diary/from-program',
        dto,
      );
      return data;
    } catch (error) {
      console.error('Error adding exercises from program:', error);
      throw error;
    }
  },

  getProgramWorkout: async (productId: number, date?: string) => {
    try {
      const params: { productId: number; date?: string } = { productId };
      if (date) {
        params.date = date;
      }
      const { data } = await httpClient.get<GetProgramWorkoutResponse>(
        '/v2/api/client/user/workout-diary/program-workout',
        { params },
      );
      return data.data;
    } catch (error) {
      console.error('Error fetching program workout:', error);
      throw error;
    }
  },
};
