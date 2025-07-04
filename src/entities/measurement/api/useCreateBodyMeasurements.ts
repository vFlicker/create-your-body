import { useMutation, useQueryClient } from '@tanstack/react-query';

import { measurementApiService } from './measurementApiService';

export const useCreateBodyMeasurements = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: measurementApiService.createBodyMeasurements,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-body-measurements'],
      });
    },
  });

  return {
    createBodyMeasurements: mutateAsync,
    isCreateBodyMeasurementsPending: isPending,
  };
};
