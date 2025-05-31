import { useQuery } from '@tanstack/react-query';

import { recipeApiService } from './recipeApiService';

export const useRecipesByCategory = (
  userQuery: string,
  page: string,
  category?: string,
) => {
  const { data, isPending } = useQuery({
    queryKey: ['recipes-by-category', category, page],
    queryFn: () =>
      recipeApiService.getRecipesByCategory(userQuery, category, page),
    enabled: !!category,
  });

  return { lecturesByWeek: data, isLecturesByWeekPending: isPending };
};
