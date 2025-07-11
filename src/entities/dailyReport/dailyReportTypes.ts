export type dailyReport = {
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
};

export type CreateDailyReportDto = {
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
    dailyLogs: dailyReport[];
  };
};
