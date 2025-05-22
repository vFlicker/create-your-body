import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userApiService } from './userApi';

export const useUpdateBodyMeasurements = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: userApiService.updateBodyMeasurements,
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
