import { useQuery } from '@tanstack/react-query';

import { recipeApiService } from './recipeApiService';

export const useRecipeDetailsById = (id: string) => {
  const { data, isPending } = useQuery({
    queryKey: ['recipe-details-by-id', id],
    queryFn: () => recipeApiService.getRecipeDetailsById(id),
  });

  return { recipeDetails: data, isRecipeDetailsPending: isPending };
};
