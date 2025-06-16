import { useQuery } from '@tanstack/react-query';

import { useUserSession } from '~/shared/store';

import { userApiService } from './userApiService';

export const useTransformationPhoto = () => {
  const { userQuery } = useUserSession();

  const { data, isPending } = useQuery({
    queryKey: ['user-transformation-photos'],
    queryFn: () => userApiService.getTransformationPhotos(userQuery),
  });

  return {
    transformationPhoto: data,
    isTransformationPhotoPending: isPending,
  };
};
