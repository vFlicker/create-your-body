import { useQuery } from '@tanstack/react-query';

import { recipeApiService } from './recipeApiService';

export const useRecipeCategories = (userQuery: string) => {
  const { data, isPending } = useQuery({
    queryKey: ['recipe-categories'],
    queryFn: () => recipeApiService.getRecipeCategories(userQuery),
  });

  return { recipeCategories: data, isRecipeCategoriesPending: isPending };
};
