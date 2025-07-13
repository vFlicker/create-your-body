import { useQuery } from '@tanstack/react-query';

import { lectureApiService } from './lectureApiService';

export const useLectureWeeks = () => {
  const { data, isPending } = useQuery({
    queryKey: ['lecture-weeks'],
    queryFn: lectureApiService.getLectureWeeks,
  });

  return { weeks: data, isWeeksPending: isPending };
};
