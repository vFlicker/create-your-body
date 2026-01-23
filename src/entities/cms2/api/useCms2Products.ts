import { useQuery } from '@tanstack/react-query';

import { cms2ApiService } from './cms2ApiService';

export const useCms2Products = () => {
  const { data, isPending } = useQuery({
    queryKey: ['cms2-products'],
    queryFn: cms2ApiService.getProducts,
  });

  return {
    products: data,
    isProductsPending: isPending,
  };
};
