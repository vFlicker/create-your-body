import { useQuery } from '@tanstack/react-query';

import { trainingApiService } from './trainingApiService';

export const useLastUnfinishedWorkout = () => {
  const { data, isPending } = useQuery({
    queryKey: ['workout-progress'],
    queryFn: trainingApiService.getLastUnfinishedWorkout,
  });

  return {
    lastUnfinishedWorkout: data,
    isLastUnfinishedWorkoutPending: isPending,
  };
};
