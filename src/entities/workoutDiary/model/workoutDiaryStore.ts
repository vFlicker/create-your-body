import { create } from 'zustand';

type Approach = {
  repetitions?: number;
  weight?: number;
};

export type Exercise = {
  name: string;
  approaches: Approach[];
};

type WorkoutDiaryStore = {
  name: string;
  exercises: Exercise[];
  setTrainingName: (name: string) => void;
  updateExercises: (name: string) => void;
  updateApproach: (
    exerciseName: string,
    approachIndex: number,
    data: Partial<Approach>,
  ) => void;
  createApproach: (exerciseName: string) => void;
  duplicateApproach: (exerciseName: string, approachIndex: number) => void;
  removeApproach: (exerciseName: string, approachIndex: number) => void;
  clear: () => void;
};

export const useWorkoutDiaryStore = create<WorkoutDiaryStore>((set) => ({
  name: '',
  exercises: [],

  setTrainingName: (name: string) => set({ name }),

  updateExercises: (name: string) => {
    set(({ exercises }) => {
      const exerciseIndex = exercises.findIndex(
        (exercise) => exercise.name === name,
      );

      if (exerciseIndex !== -1) {
        return {
          exercises: [
            ...exercises.slice(0, exerciseIndex),
            ...exercises.slice(exerciseIndex + 1),
          ],
        };
      }

      return {
        exercises: [...exercises, { name, approaches: [] }],
      };
    });
  },

  updateApproach: (
    exerciseName: string,
    approachIndex: number,
    data: Partial<Approach>,
  ) => {
    set(({ exercises }) => {
      const exercise = exercises.find(
        ({ name }) => name === exerciseName,
      ) as Exercise;

      const updatedApproaches = exercise.approaches.map((approach, index) =>
        index === approachIndex ? { ...approach, ...data } : approach,
      );

      const updatedExercises = exercises.map((exercise) =>
        exercise.name === exerciseName
          ? { ...exercise, approaches: updatedApproaches }
          : exercise,
      );

      return { exercises: updatedExercises };
    });
  },

  createApproach: (exerciseName: string) => {
    set(({ exercises }) => {
      const newApproach: Approach = {};

      return {
        exercises: exercises.map((exercise) =>
          exercise.name === exerciseName
            ? { ...exercise, approaches: [...exercise.approaches, newApproach] }
            : exercise,
        ),
      };
    });
  },

  duplicateApproach: (exerciseName: string, approachIndex: number) => {
    set(({ exercises }) => {
      const exercise = exercises.find(
        ({ name }) => name === exerciseName,
      ) as Exercise;

      const approachToDuplicate = exercise.approaches[approachIndex];
      const duplicatedApproach = { ...approachToDuplicate };

      return {
        exercises: exercises.map((exercise) =>
          exercise.name === exerciseName
            ? {
                ...exercise,
                approaches: [...exercise.approaches, duplicatedApproach],
              }
            : exercise,
        ),
      };
    });
  },

  removeApproach: (exerciseName: string, approachIndex: number) => {
    set(({ exercises }) => {
      const exercise = exercises.find(
        ({ name }) => name === exerciseName,
      ) as Exercise;

      const updatedApproaches = exercise.approaches.filter(
        (_, index) => index !== approachIndex,
      );

      return {
        exercises: exercises.map((exercise) =>
          exercise.name === exerciseName
            ? { ...exercise, approaches: updatedApproaches }
            : exercise,
        ),
      };
    });
  },

  clear: () => set({ name: '', exercises: [] }),
}));
