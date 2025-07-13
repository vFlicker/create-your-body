import { useMutation, useQueryClient } from '@tanstack/react-query';

import { dailyReportApiService } from './dailyReportApiService';

export const useCreateDailyReport = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: dailyReportApiService.createDailyReport,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['daily-reports'],
      });
    },
  });

  return {
    createDailyReport: mutateAsync,
    isCreateDailyReportPending: isPending,
  };
};
