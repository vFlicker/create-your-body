import { useQuery } from '@tanstack/react-query';

import { useUserSession } from '~/shared/store';

import { recipeApiService } from './recipeApiService';

export const useRecipeCategories = () => {
  const { query } = useUserSession();

  const { data, isPending } = useQuery({
    queryKey: ['recipe-categories'],
    queryFn: () => recipeApiService.getRecipeCategories(query),
  });

  return { recipeCategories: data, isRecipeCategoriesPending: isPending };
};
