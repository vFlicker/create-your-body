import { useQuery } from '@tanstack/react-query';

import { measurementApiService } from './measurementApiService';

export const useTransformationPhoto = () => {
  const { data, isPending } = useQuery({
    queryKey: ['user-transformation-photos'],
    queryFn: measurementApiService.getTransformationPhotos,
  });

  return {
    transformationPhoto: data,
    isTransformationPhotoPending: isPending,
  };
};
