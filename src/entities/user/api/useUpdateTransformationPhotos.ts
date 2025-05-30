import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userApiService } from './userApiService';

export const useUpdateTransformationPhotos = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: userApiService.updateTransformationPhotos,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-transformation-photos'],
      });
    },
  });

  return {
    updateTransformationPhotosMutate: mutate,
    isUpdateTransformationPhotosPending: isPending,
  };
};
