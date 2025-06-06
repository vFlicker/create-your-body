import { useQuery } from '@tanstack/react-query';

import { useUserSession } from '~/shared/store';

import { lectureApiService } from './lectureApiService';

export const useLecturesByWeek = (week?: number) => {
  const { query } = useUserSession();

  const { data, isPending } = useQuery({
    queryKey: ['lectures-by-week', week],
    queryFn: () => lectureApiService.getLecturesByWeek(query, week),
    enabled: !!week,
  });

  return { lecturesByWeek: data, isLecturesByWeekPending: isPending };
};
