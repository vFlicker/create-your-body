import { useQuery } from '@tanstack/react-query';

import { useUserSession } from '~/shared/store';

import { lectureApiService } from './lectureApiService';

export const useLectureDetailsById = (id?: string) => {
  const { userQuery } = useUserSession();

  const { data, isPending } = useQuery({
    queryKey: ['lecture-details-by-id', id],
    queryFn: () => lectureApiService.getLectureDetailsById(userQuery, id),
    enabled: !!id,
  });

  return { lectureDetails: data, isLectureDetailsPending: isPending };
};
