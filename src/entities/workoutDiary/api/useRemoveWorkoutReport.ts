import { useMutation, useQueryClient } from '@tanstack/react-query';

import { workoutDiaryApiService } from './workoutDiaryApiService';

export const useRemoveWorkoutReport = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: workoutDiaryApiService.removeWorkoutReport,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workout-reports'],
      });
    },
  });

  return {
    removeWorkoutReport: mutateAsync,
    isRemoveWorkoutReportPending: isPending,
  };
};
