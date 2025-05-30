import { useQuery } from '@tanstack/react-query';

import { userApiService } from './userApiService';

export const useTransformationPhotos = (userQuery: string) => {
  const { data, isPending } = useQuery({
    queryKey: ['user-transformation-photos'],
    queryFn: () => userApiService.getTransformationPhotos(userQuery),
  });

  return {
    transformationPhotos: data,
    isTransformationPhotosPending: isPending,
  };
};
