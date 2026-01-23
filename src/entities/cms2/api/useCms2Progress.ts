import { useQuery } from '@tanstack/react-query';

import { cms2ApiService } from './cms2ApiService';

export const useCms2Progress = (nodeId: number) => {
  const { data, isPending } = useQuery({
    queryKey: ['cms2-progress', nodeId],
    queryFn: () => cms2ApiService.getProgress(nodeId),
    enabled: !!nodeId,
    staleTime: 0,
    refetchOnMount: 'always',
  });

  return {
    progress: data,
    isProgressPending: isPending,
  };
};
