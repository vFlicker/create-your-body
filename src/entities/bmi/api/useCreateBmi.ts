import { useMutation, useQueryClient } from '@tanstack/react-query';

import { bmiApiService } from './bmiApiService';

export const useCreateBmi = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: bmiApiService.createBmi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bmi'],
      });
    },
  });

  return {
    createBmi: mutateAsync,
    isCreateBmiPending: isPending,
  };
};
