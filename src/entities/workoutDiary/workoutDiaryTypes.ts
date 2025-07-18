import { Pagination } from '~/shared/api';

type Approaches = {
  repetitions?: number;
  weight?: number;
};

type Exercise = {
  id: number;
  name: string;
  approaches: Approaches[];
};

type WorkoutDiary = {
  id: number;
  userId: number;
  name: string;
  date: string;
  exercises: Exercise[];
  createdAt: string;
  updatedAt: string;
};

type Options = {
  id: number;
  value: string;
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
  exercises: Exercise[];
};

export type RemoveWorkoutReportDto = {
  id: number;
};

export type GetExercisesResponse = {
  success: boolean;
  message: string;
  data: {
    exercises: {
      label: string;
      name: string;
      options: Options[];
    }[];
  };
};
