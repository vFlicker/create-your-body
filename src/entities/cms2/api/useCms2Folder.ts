import { useQuery } from '@tanstack/react-query';

import { cms2ApiService } from './cms2ApiService';

export const useCms2Folder = (folderId: number) => {
  const { data, isPending } = useQuery({
    queryKey: ['cms2-folder', folderId],
    queryFn: () => cms2ApiService.getFolder(folderId),
    enabled: !!folderId,
  });

  return {
    folder: data,
    isFolderPending: isPending,
  };
};
