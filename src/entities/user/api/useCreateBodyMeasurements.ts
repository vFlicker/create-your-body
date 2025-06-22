import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userApiService } from './userApiService';

export const useCreateBodyMeasurements = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: userApiService.createBodyMeasurements,
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
