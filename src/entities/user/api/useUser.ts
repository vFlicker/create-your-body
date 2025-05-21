import { useQuery } from '@tanstack/react-query';

import { userApi } from './userApi';

export const useUser = (userQuery: string) => {
  const { data, isPending } = useQuery({
    queryKey: ['current-user'],
    queryFn: () => userApi.getUser(userQuery),
  });

  return { user: data, isUserPending: isPending };
};
