import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type Approach = {
  repetitions?: number;
  weight?: number;
};

type Exercise = {
  id: number;
  name: string;
  approaches: Approach[];
};

type Training = {
  exercises: Exercise[];
};

type WorkoutDiaryStore = {
  // Training state
  training: Training;

  // Training actions
  clearTraining: () => void;
  setTrainingFromExisting: (training: Training) => void;

  // Exercise actions
  addExercise: (exerciseId: number, exerciseName: string) => void;
  removeExercise: (exerciseName: string) => void;
  toggleExercise: (exerciseId: number, exerciseName: string) => void;

  // Approach actions
  createApproach: (exerciseName: string) => void;
  updateApproach: (
    exerciseName: string,
    approachIndex: number,
    data: Partial<Approach>,
  ) => void;
  duplicateApproach: (exerciseName: string, approachIndex: number) => void;
  removeApproach: (exerciseName: string, approachIndex: number) => void;

  // Computed values
  getExerciseByName: (name: string) => Exercise;
};

export const useWorkoutDiaryStore = create<WorkoutDiaryStore>()(
  immer((set, get) => ({
    training: {
      exercises: [],
    },

    // Training actions
    clearTraining: () => {
      set((state) => {
        state.training.exercises = [];
      });
    },

    setTrainingFromExisting: (training: Training) => {
      set((state) => {
        state.training = training;
      });
    },

    // Exercise actions
    addExercise: (exerciseId: number, exerciseName: string) => {
      set((state) => {
        state.training.exercises.push({
          id: exerciseId,
          name: exerciseName,
          approaches: [],
        });
      });
    },

    removeExercise: (exerciseName: string) => {
      set((state) => {
        const index = state.training.exercises.findIndex(
          (exercise) => exercise.name === exerciseName,
        );

        if (index !== -1) {
          state.training.exercises.splice(index, 1);
        }
      });
    },

    toggleExercise: (exerciseId: number, exerciseName: string) => {
      const { training, removeExercise, addExercise } = get();

      const exerciseExists = training.exercises.some(
        (exercise) => exercise.name === exerciseName,
      );

      if (exerciseExists) {
        removeExercise(exerciseName);
      } else {
        addExercise(exerciseId, exerciseName);
      }
    },

    // Approach actions
    createApproach: (exerciseName: string) => {
      set((state) => {
        const exercise = state.training.exercises.find(
          (ex) => ex.name === exerciseName,
        );

        if (exercise) {
          exercise.approaches.push({});
        }
      });
    },

    updateApproach: (
      exerciseName: string,
      approachIndex: number,
      data: Partial<Approach>,
    ) => {
      set((state) => {
        const exercise = state.training.exercises.find(
          (ex) => ex.name === exerciseName,
        );

        if (exercise && exercise.approaches[approachIndex]) {
          Object.assign(exercise.approaches[approachIndex], data);
        }
      });
    },

    duplicateApproach: (exerciseName: string, approachIndex: number) => {
      set((state) => {
        const exercise = state.training.exercises.find(
          (ex) => ex.name === exerciseName,
        );

        if (exercise && exercise.approaches[approachIndex]) {
          const approachToDuplicate = exercise.approaches[approachIndex];
          exercise.approaches.push({ ...approachToDuplicate });
        }
      });
    },

    removeApproach: (exerciseName: string, approachIndex: number) => {
      set((state) => {
        const exercise = state.training.exercises.find(
          (ex) => ex.name === exerciseName,
        );

        if (exercise) {
          exercise.approaches.splice(approachIndex, 1);
        }
      });
    },

    // Computed values
    getExerciseByName: (name: string) => {
      const { training } = get();

      return training.exercises.find(
        (exercise) => exercise.name === name,
      ) as Exercise;
    },
  })),
);
