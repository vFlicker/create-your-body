import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userApiService } from './userApiService';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: userApiService.updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
    },
  });

  return { updateUser: mutateAsync };
};
