import { useMutation, useQueryClient } from '@tanstack/react-query';

import { trainingApiService } from './trainingApiService';

export const useUpdateWorkoutProgress = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: trainingApiService.updateWorkoutProgress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workout-progress'] });
    },
  });

  return {
    updateWorkoutProgress: mutateAsync,
    isUpdateWorkoutProgressLoading: isPending,
  };
};
