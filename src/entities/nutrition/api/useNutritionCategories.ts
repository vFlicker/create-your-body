import { useQuery } from '@tanstack/react-query';

import { useUserSession } from '~/shared/store';

import { nutritionApiService } from './nutritionApi';

export const useNutritionCategories = () => {
  const { query } = useUserSession();

  const { data, isPending } = useQuery({
    queryKey: ['nutrition-categories'],
    queryFn: () => nutritionApiService.getNutritionCategories(query),
  });

  return { nutritionCategories: data, isNutritionCategoriesPending: isPending };
};
