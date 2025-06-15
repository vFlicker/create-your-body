import { useQuery } from '@tanstack/react-query';

import { useUserSession } from '~/shared/store';

import { trainingApiService, TrainingWeekPayload } from '../trainingApiService';

export const useTrainingsByWeek = (payload: TrainingWeekPayload) => {
  const { query } = useUserSession();

  const { data, isPending } = useQuery({
    queryKey: [
      'trainings-by-week',
      payload.week,
      payload.type,
      payload.stream,
      payload.level,
    ],
    queryFn: () => trainingApiService.getTrainingsByWeek(query, payload),
  });

  return { trainingsByWeek: data, isTrainingsByWeekPending: isPending };
};
