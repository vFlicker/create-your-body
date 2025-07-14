import { useQuery } from '@tanstack/react-query';

import { userApiService } from './userApiService';

export const useUser = ({ enabled = true }) => {
  const { data, isPending } = useQuery({
    queryKey: ['current-user'],
    queryFn: userApiService.getUser,
    enabled,
  });

  return { user: data, isUserPending: isPending };
};
