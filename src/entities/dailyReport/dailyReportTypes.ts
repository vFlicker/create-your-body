export type DailyReport = {
  id: number;
  userId: number;
  reportNumber: number;
  weight: number;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
  steps: number;
  date: string;
  weightChange: {
    direction: 'up' | 'down' | 'same';
    value: number;
  };
};

export type CreateDailyReportDto = {
  date: string;
  weight?: number;
  calories?: number;
  proteins?: number;
  fats?: number;
  carbs?: number;
  steps?: number;
};

export type UpdateDailyReportDto = {
  weight?: number;
  calories?: number;
  proteins?: number;
  fats?: number;
  carbs?: number;
  steps?: number;
};

export type GetDailyReportsResponse = {
  success: boolean;
  message: string;
  data: {
    dailyLogs: DailyReport[];
  };
};

export type GetDailyReportByIdResponse = {
  success: boolean;
  message: string;
  data: {
    dailyLog: DailyReport;
  };
};
