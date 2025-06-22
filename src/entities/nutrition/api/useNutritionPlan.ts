import { useQuery } from '@tanstack/react-query';

import { nutritionApiService } from './nutritionApi';

export const useNutritionPlan = (userId: number, categoryId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['nutrition-plan', categoryId],
    queryFn: () => nutritionApiService.getNutritionPlan(userId, categoryId),
  });

  return { nutritionPlan: data, isNutritionPlanLoading: isLoading };
};
