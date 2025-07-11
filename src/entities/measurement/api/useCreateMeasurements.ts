import { useMutation, useQueryClient } from '@tanstack/react-query';

import { measurementApiService } from './measurementApiService';

export const useCreateMeasurements = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: measurementApiService.createMeasurements,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['measurements-list'],
      });
    },
  });

  return {
    createMeasurements: mutateAsync,
    isCreateMeasurementsPending: isPending,
  };
};
