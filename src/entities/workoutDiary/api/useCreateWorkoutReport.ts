import { useMutation, useQueryClient } from '@tanstack/react-query';

import { workoutDiaryApiService } from './workoutDiaryApiService';

export const useCreateWorkoutReport = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: workoutDiaryApiService.createWorkoutReport,
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
    createWorkoutReport: mutateAsync,
    isCreateWorkoutReportPending: isPending,
  };
};
