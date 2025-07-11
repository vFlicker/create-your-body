import { isToday } from 'date-fns';

import { DailyReport } from './dailyReportTypes';

export const getTodayReport = (
  dailyReports?: DailyReport[],
): DailyReport | null => {
  const todayReport = dailyReports?.[0];
  const isTodayReport = todayReport && isToday(new Date(todayReport.date));
  const report = isTodayReport ? todayReport : null;
  return report;
};
