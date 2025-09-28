import { useQuery } from '@tanstack/react-query';

import { workoutDiaryApiService } from './workoutDiaryApiService';

export const useWorkoutReportsGroupedByDate = () => {
  const { data, isPending } = useQuery({
    queryKey: ['workout-reports-grouped-by-date'],
    queryFn: workoutDiaryApiService.getWorkoutReportsGroupedByDate,
  });

  return {
    workoutReports: data?.workoutDiaries,
    pagination: data?.pagination,
    isWorkoutReportsPending: isPending,
  };
};
