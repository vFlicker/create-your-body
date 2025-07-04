import { useQuery } from '@tanstack/react-query';

import { measurementApiService } from './measurementApiService';

export const useBodyMeasurements = () => {
  const { data, isPending } = useQuery({
    queryKey: ['user-body-measurements'],
    queryFn: measurementApiService.getBodyMeasurements,
  });

  return { bodyMeasurements: data, isBodyMeasurementsPending: isPending };
};
