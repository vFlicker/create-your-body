import { useQuery } from '@tanstack/react-query';

import { useUserSession } from '~/shared/store';

import { trainingApiService } from '../trainingApiService';

export const useTrainingWeeks = (stream: number) => {
  const { userQuery } = useUserSession();

  const { data, isPending } = useQuery({
    queryKey: ['training-weeks', stream],
    queryFn: () => trainingApiService.getTrainingWeeks(userQuery, stream),
  });

  return { trainingWeeks: data, isTrainingWeeksPending: isPending };
};
