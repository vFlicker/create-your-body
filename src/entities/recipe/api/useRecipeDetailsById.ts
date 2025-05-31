import { useQuery } from '@tanstack/react-query';

import { recipeApiService } from './recipeApiService';

export const useRecipeDetailsById = (userQuery: string, id?: string) => {
  const { data, isPending } = useQuery({
    queryKey: ['recipe-details-by-id', id],
    queryFn: () => recipeApiService.getRecipeDetailsById(userQuery, id),
    enabled: !!id,
  });

  return { lectureDetails: data, isLectureDetailsPending: isPending };
};
