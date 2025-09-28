import { useQuery } from '@tanstack/react-query';

import { workoutDiaryApiService } from './workoutDiaryApiService';

export const useWorkoutReports = () => {
  const { data, isPending } = useQuery({
    queryKey: ['workout-reports'],
    queryFn: workoutDiaryApiService.getWorkoutReports,
  });

  return {
    workoutReports: data?.workoutDiaries,
    pagination: data?.pagination,
    isWorkoutReportsPending: isPending,
  };
};
