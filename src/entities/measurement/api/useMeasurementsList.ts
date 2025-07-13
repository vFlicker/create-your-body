import { useQuery } from '@tanstack/react-query';

import { measurementApiService } from './measurementApiService';

export const useMeasurementsList = () => {
  const { data, isPending } = useQuery({
    queryKey: ['measurements-list'],
    queryFn: measurementApiService.getMeasurementsList,
  });

  return { measurementsList: data, isMeasurementsListPending: isPending };
};
