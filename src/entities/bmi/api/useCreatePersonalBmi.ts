import { useMutation, useQueryClient } from '@tanstack/react-query';

import { bmiApiService } from './bmiApiService';

export const useCreatePersonalBmi = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: bmiApiService.createPersonalBmi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bmi'],
      });
    },
  });

  return {
    createPersonalBmi: mutateAsync,
    isCreatePersonalBmiPending: isPending,
  };
};
