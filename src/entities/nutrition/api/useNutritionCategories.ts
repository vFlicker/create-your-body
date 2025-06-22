import { useQuery } from '@tanstack/react-query';

import { nutritionApiService } from './nutritionApi';

export const useNutritionCategories = () => {
  const { data, isPending } = useQuery({
    queryKey: ['nutrition-categories'],
    queryFn: nutritionApiService.getNutritionCategories,
  });

  return { nutritionCategories: data, isNutritionCategoriesPending: isPending };
};
