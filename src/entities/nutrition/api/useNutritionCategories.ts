import { useQuery } from '@tanstack/react-query';

import { nutritionApi } from './nutritionApi';

export const useNutritionCategories = (userQuery: string) => {
  const { data, isPending } = useQuery({
    queryKey: ['nutrition-categories'],
    queryFn: () => nutritionApi.getNutritionCategories(userQuery),
  });

  return { nutritionCategories: data, isNutritionCategoriesPending: isPending };
};
