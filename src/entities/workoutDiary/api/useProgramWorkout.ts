import { useQuery } from '@tanstack/react-query';

import { workoutDiaryApiService } from './workoutDiaryApiService';

export const useProgramWorkout = (productId: number, date: string) => {
  const { data, isPending, refetch } = useQuery({
    queryKey: ['program-workout', productId, date],
    queryFn: () => workoutDiaryApiService.getProgramWorkout(productId, date),
    enabled: productId > 0 && !!date,
  });

  return {
    programWorkout: data?.workout ?? null,
    isProgramWorkoutPending: isPending,
    refetchProgramWorkout: refetch,
  };
};
