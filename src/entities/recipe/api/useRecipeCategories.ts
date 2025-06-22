import { useQuery } from '@tanstack/react-query';

import { recipeApiService } from './recipeApiService';

export const useRecipeCategories = () => {
  const { data, isPending } = useQuery({
    queryKey: ['recipe-categories'],
    queryFn: recipeApiService.getRecipeCategories,
  });

  return { recipeCategories: data, isRecipeCategoriesPending: isPending };
};
