import { format } from 'date-fns';

import { DailyReport } from './dailyReportTypes';

export const getReportForDate = (
  date?: Date,
  dailyReports?: DailyReport[],
): DailyReport | null => {
  if (!date || !dailyReports) return null;

  const targetDate = format(date, 'yyyy-MM-dd');

  const reportForDate = dailyReports.find((report) => {
    const reportDate = report.date.split('T')[0];
    return reportDate === targetDate;
  });

  return reportForDate || null;
};
