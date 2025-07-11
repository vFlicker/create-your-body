import { httpClient } from '~/shared/api';

import {
  CreateDailyReportDto,
  GetDailyReportsResponse,
  UpdateDailyReportDto,
} from '../dailyReportTypes';

export const dailyReportApiService = {
  createDailyReport: async ({ dto }: { dto: CreateDailyReportDto }) => {
    try {
      const { data } = await httpClient.post(
        '/v2/api/client/user/daily-logs',
        dto,
      );
      return data;
    } catch (error) {
      console.error('Error creating daily report:', error);
      throw error;
    }
  },

  getDailyReports: async () => {
    try {
      const { data } = await httpClient.get<GetDailyReportsResponse>(
        `/v2/api/client/user/daily-logs`,
      );

      return data.data.dailyLogs;
    } catch (error) {
      console.error('Error fetching measurements:', error);
      throw error;
    }
  },

  updateDailyReport: async ({
    id,
    dto,
  }: {
    id: number;
    dto: UpdateDailyReportDto;
  }) => {
    try {
      const response = await httpClient.put(
        `/v2/api/client/user/daily-logs/${id}`,
        dto,
      );
      return response;
    } catch (error) {
      console.error('Error updating daily report:', error);
      throw error;
    }
  },
};
