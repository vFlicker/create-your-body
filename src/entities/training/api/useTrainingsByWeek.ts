import { useQuery } from '@tanstack/react-query';

import { trainingApiService, TrainingWeekPayload } from './trainingApiService';

export const useTrainingsByWeek = (payload: TrainingWeekPayload) => {
  const { data, isPending } = useQuery({
    queryKey: [
      'trainings-by-week',
      payload.week,
      payload.type,
      payload.stream,
      payload.level,
    ],
    queryFn: () => trainingApiService.getTrainingsByWeek(payload),
    enabled: !!payload.level,
  });

  return { trainingsByWeek: data, isTrainingsByWeekPending: isPending };
};
