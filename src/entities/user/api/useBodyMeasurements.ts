import { useQuery } from '@tanstack/react-query';

import { userApiService } from './userApiService';

export const useBodyMeasurements = (userQuery: string) => {
  const { data, isPending } = useQuery({
    queryKey: ['user-body-measurements'],
    queryFn: () => userApiService.getBodyMeasurements(userQuery),
  });

  return { bodyMeasurements: data, isBodyMeasurementsPending: isPending };
};
