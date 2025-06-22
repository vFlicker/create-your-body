import { useQuery } from '@tanstack/react-query';

import { lectureApiService } from './lectureApiService';

export const useLectureDetailsById = (id: string) => {
  const { data, isPending } = useQuery({
    queryKey: ['lecture-details-by-id', id],
    queryFn: () => lectureApiService.getLectureDetailsById(id),
  });

  return { lectureDetails: data, isLectureDetailsPending: isPending };
};
