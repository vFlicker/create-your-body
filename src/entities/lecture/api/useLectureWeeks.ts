import { useQuery } from '@tanstack/react-query';

import { lectureApiService } from './lectureApiService';

export const useLectureWeeks = (userQuery: string) => {
  const { data, isPending } = useQuery({
    queryKey: ['lecture-weeks'],
    queryFn: () => lectureApiService.getLectureWeeks(userQuery),
  });

  return { weeks: data, isWeeksPending: isPending };
};
