import { useWorkoutDiaryStore } from '~/entities/workoutDiary';

export const useExerciseSelection = () => {
  const { training, toggleExercise } = useWorkoutDiaryStore();

  const isExerciseSelected = (exerciseName: string) => {
    return training.exercises.some(
      (exercise) => exercise.name === exerciseName,
    );
  };

  const selectedExercisesCount = training.exercises.length;

  return {
    toggleExercise,
    isExerciseSelected,
    selectedExercisesCount,
  };
};
