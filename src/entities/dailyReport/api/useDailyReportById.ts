import { useQuery } from '@tanstack/react-query';

import { dailyReportApiService } from './dailyReportApiService';

export const useDailyReportById = (id: number) => {
  const { data, isPending } = useQuery({
    queryKey: ['daily-reports', id],
    queryFn: () => dailyReportApiService.getDailyReportById(id),
  });

  return { dailyReport: data, isDailyReportPending: isPending };
};
