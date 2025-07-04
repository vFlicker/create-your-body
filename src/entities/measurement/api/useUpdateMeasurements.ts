import { useMutation, useQueryClient } from '@tanstack/react-query';

import { measurementApiService } from './measurementApiService';

export const useUpdateMeasurements = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: measurementApiService.updateMeasurements,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-measurements'],
      });
    },
  });

  return {
    updateMeasurementsMutate: mutate,
    isUpdateMeasurementsPending: isPending,
  };
};
