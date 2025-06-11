import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userApiService } from './userApiService';

export const useUpdateGreetVideoProgress = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: userApiService.updateGreetVideoProgress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['current-user'],
      });
    },
  });

  return {
    updateGreetVideoProgress: mutateAsync,
  };
};
