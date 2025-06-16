import { useQuery } from '@tanstack/react-query';

import { useUserSession } from '~/shared/store';

import { userApiService } from './userApiService';

export const useUser = () => {
  const { userQuery } = useUserSession();

  const { data, isPending } = useQuery({
    queryKey: ['current-user'],
    queryFn: () => userApiService.getUser(userQuery),
    enabled: !!userQuery,
  });

  return { user: data, isUserPending: isPending };
};
