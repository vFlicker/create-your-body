import { useQuery } from '@tanstack/react-query';

import { measurementApiService } from './measurementApiService';

export const useMeasurements = () => {
  const { data, isPending } = useQuery({
    queryKey: ['user-measurements'],
    queryFn: measurementApiService.getMeasurements,
  });

  return { measurements: data, isMeasurementsPending: isPending };
};
