import { useQuery } from '@tanstack/react-query';

import { trainingApiService } from '../trainingApiService';

export const useTrainingWeeks = (userQuery: string, stream: number) => {
  const { data, isPending } = useQuery({
    queryKey: ['training-weeks'],
    queryFn: () => trainingApiService.getTrainingWeeks(userQuery, stream),
  });

  return { weeks: data, isWeeksPending: isPending };
};
