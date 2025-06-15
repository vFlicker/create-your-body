import { useQuery } from '@tanstack/react-query';

import { useUserSession } from '~/shared/store';

import { trainingApiService } from '../trainingApiService';

export const useTrainingDetailsById = (id: string) => {
  const { query } = useUserSession();

  const { data, isPending } = useQuery({
    queryKey: ['training-details-by-id', id],
    queryFn: () => trainingApiService.getTrainingDetailsById(query, id),
  });

  return { trainingDetails: data, isTrainingDetailsPending: isPending };
};
