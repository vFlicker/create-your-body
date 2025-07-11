import { useQuery } from '@tanstack/react-query';

import { dailyReportApiService } from './dailyReportApiService';

export const useDailyReports = () => {
  const { data, isPending } = useQuery({
    queryKey: ['daily-reports'],
    queryFn: dailyReportApiService.getDailyReports,
  });

  return { dailyReports: data, isDailyReportsPending: isPending };
};
