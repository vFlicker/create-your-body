import { useMutation, useQueryClient } from '@tanstack/react-query';

import { measurementApiService } from './measurementApiService';

export const useUpdateTransformationPhoto = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: measurementApiService.updateTransformationPhotos,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-transformation-photos'],
      });
    },
  });

  return {
    updateTransformationPhotoMutate: mutate,
    isUpdateTransformationPhotoPending: isPending,
  };
};
