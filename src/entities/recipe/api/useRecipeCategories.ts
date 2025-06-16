import { useQuery } from '@tanstack/react-query';

import { useUserSession } from '~/shared/store';

import { recipeApiService } from './recipeApiService';

export const useRecipeCategories = () => {
  const { userQuery } = useUserSession();

  const { data, isPending } = useQuery({
    queryKey: ['recipe-categories'],
    queryFn: () => recipeApiService.getRecipeCategories(userQuery),
  });

  return { recipeCategories: data, isRecipeCategoriesPending: isPending };
};
