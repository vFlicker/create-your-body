import { useQuery } from '@tanstack/react-query';

import { useUserSession } from '~/shared/store';

import { lectureApiService } from './lectureApiService';

export const useLectureDetailsById = (id?: string) => {
  const { query } = useUserSession();

  const { data, isPending } = useQuery({
    queryKey: ['lecture-details-by-id', id],
    queryFn: () => lectureApiService.getLectureDetailsById(query, id),
    enabled: !!id,
  });

  return { lectureDetails: data, isLectureDetailsPending: isPending };
};
