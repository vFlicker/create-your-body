import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { AppRoute } from '~/shared/router';

import { userApiService } from './userApiService';

export const useUpdateUser = (navigateTo?: AppRoute) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: userApiService.updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
      if (navigateTo) navigate(navigateTo);
    },
  });

  return { updateUserMutate: mutate };
};
