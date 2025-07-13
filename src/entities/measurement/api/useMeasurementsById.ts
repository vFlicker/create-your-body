import { useQuery } from '@tanstack/react-query';

import { measurementApiService } from './measurementApiService';

export const useMeasurementsById = (id: string) => {
  const { data, isPending } = useQuery({
    queryKey: ['measurements-list', id],
    queryFn: () => measurementApiService.getMeasurementsById(id),
  });

  return { measurements: data, isMeasurementsPending: isPending };
};
