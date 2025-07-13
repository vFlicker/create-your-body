import { useQuery } from '@tanstack/react-query';

import { lectureApiService } from './lectureApiService';

export const useLecturesByWeek = (week: string) => {
  const { data, isPending } = useQuery({
    queryKey: ['lectures-by-week', week],
    queryFn: () => lectureApiService.getLecturesByWeek(week),
  });

  return { lecturesByWeek: data, isLecturesByWeekPending: isPending };
};
