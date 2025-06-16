import { useQuery } from '@tanstack/react-query';

import { useUserSession } from '~/shared/store';

import { nutritionApiService } from './nutritionApi';

export const useNutritionCategories = () => {
  const { userQuery } = useUserSession();

  const { data, isPending } = useQuery({
    queryKey: ['nutrition-categories'],
    queryFn: () => nutritionApiService.getNutritionCategories(userQuery),
  });

  return { nutritionCategories: data, isNutritionCategoriesPending: isPending };
};
