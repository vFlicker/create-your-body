import { isSameDay } from 'date-fns';

import { DailyReport } from './dailyReportTypes';

export const getReportForDate = (
  date?: Date,
  dailyReports?: DailyReport[],
): DailyReport | null => {
  if (!date || !dailyReports) return null;

  const reportForDate = dailyReports.find((report) => {
    return isSameDay(new Date(report.date), date);
  });

  return reportForDate || null;
};
