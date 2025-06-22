import { useQuery } from '@tanstack/react-query';

import { userApiService } from './userApiService';

export const useTransformationPhoto = () => {
  const { data, isPending } = useQuery({
    queryKey: ['user-transformation-photos'],
    queryFn: userApiService.getTransformationPhotos,
  });

  return {
    transformationPhoto: data,
    isTransformationPhotoPending: isPending,
  };
};
