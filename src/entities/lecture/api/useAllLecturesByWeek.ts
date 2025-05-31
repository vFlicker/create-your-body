import { useQuery } from '@tanstack/react-query';

import { lectureApiService } from './lectureApiService';

export const useAllLecturesByWeek = (userQuery: string, week?: number) => {
  const { data, isPending } = useQuery({
    queryKey: ['all-lectures-by-week', userQuery, week],
    queryFn: () => lectureApiService.getAllLecturesByWeek(userQuery, week),
    enabled: !!week,
  });

  return { lecturesByWeek: data, isLecturesByWeekPending: isPending };
};
