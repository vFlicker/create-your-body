import { useQuery } from '@tanstack/react-query';

import { trainingApiService } from './trainingApiService';

export const useTrainingDetailsById = (id: string) => {
  const { data, isPending } = useQuery({
    queryKey: ['training-details-by-id', id],
    queryFn: () => trainingApiService.getTrainingDetailsById(id),
  });

  return { trainingDetails: data, isTrainingDetailsPending: isPending };
};
