import { useMutation, useQueryClient } from '@tanstack/react-query';

import { workoutDiaryApiService } from './workoutDiaryApiService';

export const useAddFromProgram = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: workoutDiaryApiService.addFromProgram,
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
    addFromProgram: mutateAsync,
    isAddFromProgramPending: isPending,
  };
};
