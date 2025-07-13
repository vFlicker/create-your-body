import { useMutation, useQueryClient } from '@tanstack/react-query';

import { measurementApiService } from './measurementApiService';

export const useUpdateTransformationPhoto = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = useMutation({
    mutationFn: measurementApiService.updateTransformationPhotos,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-transformation-photos'],
      });
    },
  });

  return {
    updateTransformationPhoto: mutate,
    isUpdateTransformationPhotoPending: isPending,
    uploadingStage: variables?.stage,
  };
};
