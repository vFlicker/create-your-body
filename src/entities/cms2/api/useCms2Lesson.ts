import { useQuery } from '@tanstack/react-query';

import { cms2ApiService } from './cms2ApiService';

export const useCms2Lesson = (nodeId: number) => {
  const { data, isPending } = useQuery({
    queryKey: ['cms2-lesson', nodeId],
    queryFn: () => cms2ApiService.getLesson(nodeId),
    enabled: !!nodeId,
  });

  return {
    lesson: data,
    isLessonPending: isPending,
  };
};
