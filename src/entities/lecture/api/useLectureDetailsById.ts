import { useQuery } from '@tanstack/react-query';

import { lectureApiService } from './lectureApiService';

export const useLectureDetailsById = (userQuery: string, id?: string) => {
  const { data, isPending } = useQuery({
    queryKey: ['lecture-details-by-id', id],
    queryFn: () => lectureApiService.getLectureDetailsById(userQuery, id),
    enabled: !!id,
  });

  return { lectureDetails: data, isLectureDetailsPending: isPending };
};
