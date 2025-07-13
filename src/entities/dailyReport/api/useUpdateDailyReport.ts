import { useMutation, useQueryClient } from '@tanstack/react-query';

import { dailyReportApiService } from './dailyReportApiService';

export const useUpdateDailyReport = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: dailyReportApiService.updateDailyReport,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['daily-reports'],
      });
    },
  });

  return {
    updateDailyReportsMutate: mutate,
    isUpdateDailyReportsPending: isPending,
  };
};
