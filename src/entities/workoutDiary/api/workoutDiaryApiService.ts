import { httpClient } from '~/shared/api/httpClient';

import { GetExercisesResponse } from '../workoutDiaryTypes';

export const workoutDiaryApiService = {
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
