import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cms2ApiService } from './cms2ApiService';

export const useMarkPageComplete = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ nodeId, pageId }: { nodeId: number; pageId: string }) =>
      cms2ApiService.markPageComplete(nodeId, pageId),
    onSuccess: (_, { nodeId }) => {
      queryClient.invalidateQueries({ queryKey: ['cms2-progress', nodeId] });
    },
  });

  return {
    markPageComplete: mutateAsync,
    isMarkingComplete: isPending,
  };
};

export const useMarkLessonComplete = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (nodeId: number) => cms2ApiService.markLessonComplete(nodeId),
    onSuccess: (_, nodeId) => {
      queryClient.invalidateQueries({ queryKey: ['cms2-progress', nodeId] });
      // Инвалидируем все папки чтобы обновить галочки
      queryClient.invalidateQueries({ queryKey: ['cms2-folder'] });
    },
  });

  return {
    markLessonComplete: mutateAsync,
    isMarkingLessonComplete: isPending,
  };
};
