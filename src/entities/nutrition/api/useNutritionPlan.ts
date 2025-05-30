import { useQuery } from '@tanstack/react-query';

import { nutritionApiService } from './nutritionApi';

export const useNutritionPlan = (
  userQuery: string,
  userId: string,
  pdfId: string,
) => {
  const { data, isLoading } = useQuery({
    queryKey: ['nutrition-plan', pdfId],
    queryFn: () =>
      nutritionApiService.getNutritionPlanByPdfId(userQuery, userId, pdfId),
    enabled: !!pdfId,
  });

  return { nutritionPlan: data, isNutritionPlanLoading: isLoading };
};
