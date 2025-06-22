import { useQuery } from '@tanstack/react-query';

import { trainingApiService } from './trainingApiService';

export const useTrainingWeeks = (stream: number) => {
  const { data, isPending } = useQuery({
    queryKey: ['training-weeks', stream],
    queryFn: () => trainingApiService.getTrainingWeeks(stream),
  });

  return { trainingWeeks: data, isTrainingWeeksPending: isPending };
};
