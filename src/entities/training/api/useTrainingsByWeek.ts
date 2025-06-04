import { useQuery } from '@tanstack/react-query';

import { trainingApiService } from '../trainingApiService';

export const useTrainingsByWeek = (
  userQuery: string,
  meta: {
    level: string;
    type: string;
    stream: number;
  },
  week?: number,
) => {
  const { data, isPending } = useQuery({
    queryKey: ['trainings-by-week', week],
    queryFn: () => trainingApiService.getTrainingsByWeek(userQuery, week, meta),
    enabled: !!week,
  });

  return { trainingsByWeek: data, isTrainingsByWeekPending: isPending };
};
