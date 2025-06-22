import { useQuery } from '@tanstack/react-query';

import { userApiService } from './userApiService';

export const useBodyMeasurements = () => {
  const { data, isPending } = useQuery({
    queryKey: ['user-body-measurements'],
    queryFn: userApiService.getBodyMeasurements,
  });

  return { bodyMeasurements: data, isBodyMeasurementsPending: isPending };
};
