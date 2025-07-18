import { Pagination } from '~/shared/api';

type Exercise = {
  id: number;
  value: string;
};

export type GetExercisesResponse = {
  success: boolean;
  message: string;
  data: {
    exercises: {
      label: string;
      name: string;
      options: Exercise[];
    }[];
  };
};

type WorkoutDiary = {
  id: number;
  userId: number;
  name: string;
  date: string;
  exercises: {
    name: string;
    approaches: {
      weight?: number;
      repetitions?: number;
    }[];
  }[];
  createdAt: string;
  updatedAt: string;
};

export type GetWorkoutReportsResponse = {
  success: boolean;
  message: string;
  data: {
    workoutDiaries: WorkoutDiary[];
    pagination: Pagination;
  };
};

export type CreateWorkoutReportDto = {
  name: string;
  date: string;
  exercises: {
    id: number;
    name: string;
    approaches: {
      repetitions?: number;
      weight?: number;
    }[];
  }[];
};

export type RemoveWorkoutReportDto = {
  id: number;
};
