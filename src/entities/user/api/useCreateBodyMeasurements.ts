import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userApiService } from './userApi';

export const useCreateBodyMeasurements = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: userApiService.createBodyMeasurements,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-body-measurements'],
      });
    },
  });

  return {
    createBodyMeasurementsMutate: mutate,
    isCreateBodyMeasurementsPending: isPending,
  };
};
