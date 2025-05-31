import { useQuery } from '@tanstack/react-query';

import { lectureApiService } from './lectureApiService';

export const useAllWeeks = (userQuery: string) => {
  const { data, isPending } = useQuery({
    queryKey: ['all-lecture-weeks', userQuery],
    queryFn: () => lectureApiService.getAllWeeks(userQuery),
  });

  return { weeks: data, isWeeksPending: isPending };
};
