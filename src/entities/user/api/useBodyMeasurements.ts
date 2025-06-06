import { useQuery } from '@tanstack/react-query';

import { useUserSession } from '~/shared/store';

import { userApiService } from './userApiService';

export const useBodyMeasurements = () => {
  const { query } = useUserSession();

  const { data, isPending } = useQuery({
    queryKey: ['user-body-measurements'],
    queryFn: () => userApiService.getBodyMeasurements(query),
  });

  return { bodyMeasurements: data, isBodyMeasurementsPending: isPending };
};
