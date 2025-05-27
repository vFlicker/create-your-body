import { useQuery } from '@tanstack/react-query';

import { nutritionApi } from './nutritionApi';

export const useNutritionPlan = (
  userQuery: string,
  userId: string,
  pdfId: string,
) => {
  const { data, isLoading } = useQuery({
    queryKey: ['nutrition-plan', pdfId],
    queryFn: () =>
      nutritionApi.getNutritionPlanByPdfId(userQuery, userId, pdfId),
    enabled: !!pdfId,
  });

  return { nutritionPlan: data, isNutritionPlanLoading: isLoading };
};
