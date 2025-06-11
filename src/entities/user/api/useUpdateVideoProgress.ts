import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userApiService } from './userApiService';

export const useUpdateVideoProgress = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: userApiService.updateVideoProgress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['current-user'],
      });
    },
  });

  return {
    updateVideoProgress: mutateAsync,
  };
};
