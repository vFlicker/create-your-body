import { useQuery } from '@tanstack/react-query';

import { workoutDiaryApiService } from './workoutDiaryApiService';

export const useApproachesHistory = (exerciseId: number) => {
  const { data, isPending } = useQuery({
    queryKey: ['approaches-history', exerciseId],
    queryFn: () => workoutDiaryApiService.getApproachesHistory(exerciseId),
  });

  return {
    approachesHistory: data,
    isApproachesHistoryPending: isPending,
  };
};
