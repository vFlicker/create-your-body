import { useQuery } from '@tanstack/react-query';

import { cms2ApiService } from './cms2ApiService';

export const useCms2Breadcrumbs = (nodeId: number) => {
  const { data, isPending } = useQuery({
    queryKey: ['cms2-breadcrumbs', nodeId],
    queryFn: () => cms2ApiService.getBreadcrumbs(nodeId),
    enabled: nodeId > 0,
  });

  return {
    breadcrumbs: data || [],
    isBreadcrumbsPending: isPending,
  };
};
