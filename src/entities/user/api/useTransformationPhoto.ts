import { useQuery } from '@tanstack/react-query';

import { useUserSession } from '~/shared/store';

import { userApiService } from './userApiService';

export const useTransformationPhoto = () => {
  const { query } = useUserSession();

  const { data, isPending } = useQuery({
    queryKey: ['user-transformation-photos'],
    queryFn: () => userApiService.getTransformationPhotos(query),
  });

  return {
    transformationPhoto: data,
    isTransformationPhotoPending: isPending,
  };
};
