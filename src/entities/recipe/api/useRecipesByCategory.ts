import { useInfiniteQuery } from '@tanstack/react-query';

import { recipeApiService } from './recipeApiService';

export const useRecipesByCategory = (category: string) => {
  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['recipes-by-category', category],
      initialPageParam: 1,
      queryFn: ({ pageParam }) =>
        recipeApiService.getRecipesByCategory(category, pageParam),
      getNextPageParam: ({ meta }) => {
        return meta.page < meta.totalPages ? meta.page + 1 : undefined;
      },
    });

  const recipes = data?.pages.flatMap(({ data }) => data) ?? [];

  return {
    recipes,
    isRecipesPending: isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
