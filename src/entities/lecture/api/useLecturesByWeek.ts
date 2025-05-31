import { useQuery } from '@tanstack/react-query';

import { lectureApiService } from './lectureApiService';

export const useLecturesByWeek = (userQuery: string, week?: number) => {
  const { data, isPending } = useQuery({
    queryKey: ['lectures-by-week', week],
    queryFn: () => lectureApiService.getLecturesByWeek(userQuery, week),
    enabled: !!week,
  });

  return { lecturesByWeek: data, isLecturesByWeekPending: isPending };
};
