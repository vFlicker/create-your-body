import { useQuery } from '@tanstack/react-query';

import { useUserSession } from '~/shared/store';

import { nutritionApiService } from './nutritionApi';

export const useNutritionPlan = (pdfId: string) => {
  const { query, id } = useUserSession();

  const { data, isLoading } = useQuery({
    queryKey: ['nutrition-plan', pdfId],
    queryFn: () =>
      nutritionApiService.getNutritionPlanByPdfId(query, id, pdfId),
    enabled: !!pdfId,
  });

  return { nutritionPlan: data, isNutritionPlanLoading: isLoading };
};
