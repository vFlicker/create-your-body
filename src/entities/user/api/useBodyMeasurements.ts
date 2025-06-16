import { useQuery } from '@tanstack/react-query';

import { useUserSession } from '~/shared/store';

import { userApiService } from './userApiService';

export const useBodyMeasurements = () => {
  const { userQuery } = useUserSession();

  const { data, isPending } = useQuery({
    queryKey: ['user-body-measurements'],
    queryFn: () => userApiService.getBodyMeasurements(userQuery),
  });

  return { bodyMeasurements: data, isBodyMeasurementsPending: isPending };
};
