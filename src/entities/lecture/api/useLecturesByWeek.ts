import { useQuery } from '@tanstack/react-query';

import { useUserSession } from '~/shared/store';

import { lectureApiService } from './lectureApiService';

export const useLecturesByWeek = (week: string) => {
  const { userQuery } = useUserSession();

  const { data, isPending } = useQuery({
    queryKey: ['lectures-by-week', week],
    queryFn: () => lectureApiService.getLecturesByWeek(userQuery, week),
  });

  return { lecturesByWeek: data, isLecturesByWeekPending: isPending };
};
