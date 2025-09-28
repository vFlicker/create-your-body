import { useQuery } from '@tanstack/react-query';

import { workoutDiaryApiService } from './workoutDiaryApiService';

export const useWorkoutReport = (id?: number) => {
  const { data, isPending } = useQuery({
    queryKey: ['workout-reports', 'workout-reports-grouped-by-date', id],
    queryFn: () => workoutDiaryApiService.getWorkoutReport(id!),
    enabled: !!id,
  });

  return {
    workoutReport: data,
    isWorkoutReportPending: isPending,
  };
};
