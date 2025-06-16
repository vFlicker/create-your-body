import { useQuery } from '@tanstack/react-query';

import { useUserSession } from '~/shared/store';

import { recipeApiService } from './recipeApiService';

export const useRecipeDetailsById = (id: string) => {
  const { userQuery } = useUserSession();

  const { data, isPending } = useQuery({
    queryKey: ['recipe-details-by-id', id],
    queryFn: () => recipeApiService.getRecipeDetailsById(userQuery, id),
  });

  return { recipeDetails: data, isRecipeDetailsPending: isPending };
};
