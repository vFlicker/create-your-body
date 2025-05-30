import { useQuery } from '@tanstack/react-query';

import { userApiService } from './userApiService';

export const useUser = (userQuery: string) => {
  const { data, isPending } = useQuery({
    queryKey: ['current-user'],
    queryFn: () => userApiService.getUser(userQuery),
  });

  return { user: data, isUserPending: isPending };
};
