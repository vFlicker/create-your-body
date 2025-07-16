import { create } from 'zustand';

type Approach = {
  repetitions: number;
  weight: number;
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

  clear: () => set({ name: '', exercises: [] }),
}));
