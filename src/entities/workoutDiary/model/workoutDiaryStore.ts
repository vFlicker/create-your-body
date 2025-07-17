import { create } from 'zustand';

type Approach = {
  repetitions?: number;
  weight?: number;
};

type Exercise = {
  name: string;
  approaches: Approach[];
};

type Training = {
  name: string;
  exercises: Exercise[];
};

type WorkoutDiaryStore = {
  // Training state
  training: Training;

  // Training actions
  setTrainingName: (name: string) => void;
  clearTraining: () => void;

  // Exercise actions
  addExercise: (exerciseName: string) => void;
  removeExercise: (exerciseName: string) => void;
  toggleExercise: (exerciseName: string) => void;

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
  isTrainingValid: () => boolean;
  getExerciseByName: (name: string) => Exercise;
};

export const useWorkoutDiaryStore = create<WorkoutDiaryStore>((set, get) => ({
  training: {
    name: '',
    exercises: [],
  },

  // Training actions
  setTrainingName: (name: string) => {
    set((state) => ({
      training: { ...state.training, name },
    }));
  },

  clearTraining: () => {
    set({
      training: { name: '', exercises: [] },
    });
  },

  // Exercise actions
  addExercise: (exerciseName: string) => {
    set((state) => ({
      training: {
        ...state.training,
        exercises: [
          ...state.training.exercises,
          { name: exerciseName, approaches: [] },
        ],
      },
    }));
  },

  removeExercise: (exerciseName: string) => {
    set((state) => ({
      training: {
        ...state.training,
        exercises: state.training.exercises.filter(
          (exercise) => exercise.name !== exerciseName,
        ),
      },
    }));
  },

  toggleExercise: (exerciseName: string) => {
    const { training, removeExercise, addExercise } = get();
    const exerciseExists = training.exercises.some(
      (exercise) => exercise.name === exerciseName,
    );

    if (exerciseExists) {
      removeExercise(exerciseName);
    } else {
      addExercise(exerciseName);
    }
  },

  // Approach actions
  createApproach: (exerciseName: string) => {
    set((state) => ({
      training: {
        ...state.training,
        exercises: state.training.exercises.map((exercise) =>
          exercise.name === exerciseName
            ? { ...exercise, approaches: [...exercise.approaches, {}] }
            : exercise,
        ),
      },
    }));
  },

  updateApproach: (
    exerciseName: string,
    approachIndex: number,
    data: Partial<Approach>,
  ) => {
    set((state) => ({
      training: {
        ...state.training,
        exercises: state.training.exercises.map((exercise) =>
          exercise.name === exerciseName
            ? {
                ...exercise,
                approaches: exercise.approaches.map((approach, index) =>
                  index === approachIndex ? { ...approach, ...data } : approach,
                ),
              }
            : exercise,
        ),
      },
    }));
  },

  duplicateApproach: (exerciseName: string, approachIndex: number) => {
    set((state) => {
      const exercise = state.training.exercises.find(
        (ex) => ex.name === exerciseName,
      ) as Exercise;

      const approachToDuplicate = exercise.approaches[approachIndex];

      return {
        training: {
          ...state.training,
          exercises: state.training.exercises.map((ex) =>
            ex.name === exerciseName
              ? {
                  ...ex,
                  approaches: [...ex.approaches, { ...approachToDuplicate }],
                }
              : ex,
          ),
        },
      };
    });
  },

  removeApproach: (exerciseName: string, approachIndex: number) => {
    set((state) => ({
      training: {
        ...state.training,
        exercises: state.training.exercises.map((exercise) =>
          exercise.name === exerciseName
            ? {
                ...exercise,
                approaches: exercise.approaches.filter(
                  (_, index) => index !== approachIndex,
                ),
              }
            : exercise,
        ),
      },
    }));
  },

  // Computed values
  isTrainingValid: () => {
    const { training } = get();
    return training.name.trim().length > 0 && training.exercises.length > 0;
  },

  getExerciseByName: (name: string) => {
    const { training } = get();

    return training.exercises.find(
      (exercise) => exercise.name === name,
    ) as Exercise;
  },
}));
