import { useQuery } from '@tanstack/react-query';

import { userApiService } from './userApiService';

export const useUser = () => {
  const { data, isPending } = useQuery({
    queryKey: ['current-user'],
    queryFn: userApiService.getUser,
  });

  return { user: data, isUserPending: isPending };
};
