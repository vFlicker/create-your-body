import { useQuery } from '@tanstack/react-query';

import { useUserSession } from '~/shared/store';

import { recipeApiService } from './recipeApiService';

export const useRecipeDetailsById = (id: string) => {
  const { query } = useUserSession();

  const { data, isPending } = useQuery({
    queryKey: ['recipe-details-by-id', id],
    queryFn: () => recipeApiService.getRecipeDetailsById(query, id),
  });

  return { recipeDetails: data, isRecipeDetailsPending: isPending };
};
