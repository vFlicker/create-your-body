import { useMutation, useQueryClient } from '@tanstack/react-query';

import { workoutDiaryApiService } from './workoutDiaryApiService';

export const useUpdateWorkoutReport = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: workoutDiaryApiService.updateWorkoutReport,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workout-reports'],
      });
      queryClient.invalidateQueries({
        queryKey: ['workout-reports-grouped-by-date'],
      });
    },
  });

  return {
    updateWorkoutReport: mutateAsync,
    isUpdateWorkoutReportPending: isPending,
  };
};
