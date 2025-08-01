import { useWorkoutDiaryStore } from '~/entities/workoutDiary';

export const useApproachesManagement = (exerciseName: string) => {
  const {
    getExerciseByName,
    updateApproach,
    duplicateApproach,
    removeApproach,
  } = useWorkoutDiaryStore();

  const exercise = getExerciseByName(exerciseName);

  const handleUpdateApproach = (
    approachIndex: number,
    field: 'repetitions' | 'weight',
    value: string,
  ) => {
    const numericValue = Number(value) || 0;
    updateApproach(exerciseName, approachIndex, {
      [field]: numericValue,
    });
  };

  return {
    exercise,
    updateApproach: handleUpdateApproach,
    duplicateApproach: (index: number) =>
      duplicateApproach(exerciseName, index),
    removeApproach: (index: number) => removeApproach(exerciseName, index),
  };
};
