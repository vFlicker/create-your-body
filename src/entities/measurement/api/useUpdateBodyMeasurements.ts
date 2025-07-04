import { useMutation, useQueryClient } from '@tanstack/react-query';

import { measurementApiService } from './measurementApiService';

export const useUpdateBodyMeasurements = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: measurementApiService.updateBodyMeasurements,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-body-measurements'],
      });
    },
  });

  return {
    updateBodyMeasurementsMutate: mutate,
    isUpdateBodyMeasurementsPending: isPending,
  };
};
