import { useQuery } from '@tanstack/react-query';

import { useUserSession } from '~/shared/store';

import { userApiService } from './userApiService';

export const useUser = () => {
  const { query } = useUserSession();

  const { data, isPending } = useQuery({
    queryKey: ['current-user'],
    queryFn: () => userApiService.getUser(query),
    enabled: !!query,
  });

  return { user: data, isUserPending: isPending };
};
