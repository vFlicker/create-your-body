import { useQuery } from '@tanstack/react-query';

import { nutritionApiService } from './nutritionApi';

export const useNutritionPlan = (categoryId: string, userId?: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ['nutrition-plan', categoryId],
    queryFn: () => nutritionApiService.getNutritionPlan(userId!, categoryId),
    enabled: !!userId,
  });

  return { nutritionPlan: data, isNutritionPlanLoading: isLoading };
};
