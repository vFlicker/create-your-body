import { useQuery } from '@tanstack/react-query';

import { useUserSession } from '~/shared/store';

import { lectureApiService } from './lectureApiService';

export const useLectureWeeks = () => {
  const { userQuery } = useUserSession();

  const { data, isPending } = useQuery({
    queryKey: ['lecture-weeks'],
    queryFn: () => lectureApiService.getLectureWeeks(userQuery),
  });

  return { weeks: data, isWeeksPending: isPending };
};
