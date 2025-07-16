import { create } from 'zustand';

type Approach = {
  repetitions: number;
  weight: number;
};

type Exercise = {
  title: string;
  approaches: Approach[];
};

type WorkoutDiaryStore = {
  trainingName: string;
  exercises: Exercise[];

  setTrainingName: (name: string) => void;

  setExercises: (exercises: Exercise[]) => void;
};

export const useWorkoutDiaryStore = create<WorkoutDiaryStore>((set) => ({
  trainingName: '',
  exercises: [],

  setTrainingName: (name: string) => set({ trainingName: name }),

  setExercises: (exercises: Exercise[]) => set({ exercises }),
}));
