import { useQuery } from '@tanstack/react-query';

import { nutritionApiService } from './nutritionApi';

export const useNutritionCategories = (userQuery: string) => {
  const { data, isPending } = useQuery({
    queryKey: ['nutrition-categories'],
    queryFn: () => nutritionApiService.getNutritionCategories(userQuery),
  });

  return { nutritionCategories: data, isNutritionCategoriesPending: isPending };
};
