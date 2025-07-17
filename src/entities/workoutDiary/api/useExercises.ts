import { useQuery } from '@tanstack/react-query';

import { workoutDiaryApiService } from './workoutDiaryApiService';

export const useExercises = ({ enabled = true } = {}) => {
  const { data, isPending } = useQuery({
    queryKey: ['workout-diary-exercises'],
    queryFn: workoutDiaryApiService.getExercises,
    enabled,
  });

  return { exercises: data, isExercisesPending: isPending };
};
