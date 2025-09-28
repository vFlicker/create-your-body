import { useQuery } from '@tanstack/react-query';

import { workoutDiaryApiService } from './workoutDiaryApiService';

export const useExercises = (search?: string) => {
  const { data, isPending } = useQuery({
    queryKey: ['workout-diary-exercises', search],
    queryFn: () => workoutDiaryApiService.getExercises(search),
  });

  return { exercises: data, isExercisesPending: isPending };
};
