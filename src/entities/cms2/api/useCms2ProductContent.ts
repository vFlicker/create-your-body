import { useQuery } from '@tanstack/react-query';

import { cms2ApiService } from './cms2ApiService';

export const useCms2ProductContent = (productId: number) => {
  const { data, isPending } = useQuery({
    queryKey: ['cms2-product-content', productId],
    queryFn: () => cms2ApiService.getProductContent(productId),
    enabled: !!productId,
  });

  return {
    productContent: data,
    isProductContentPending: isPending,
  };
};
