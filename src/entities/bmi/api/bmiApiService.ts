import { httpClient } from '~/shared/api';

import { CreateBmiDto, CreatePersonalBmi, GetBmiResponse } from '../bmiTypes';

export const bmiApiService = {
  createBmi: async ({ dto }: { dto: CreateBmiDto }) => {
    try {
      const { data } = await httpClient.post(
        '/v2/api/client/user/nutrition-plan',
        dto,
      );
      return data;
    } catch (error) {
      console.error('Error creating BMI entry:', error);
      throw error;
    }
  },

  createPersonalBmi: async ({ dto }: { dto: CreatePersonalBmi }) => {
    try {
      const { data } = await httpClient.patch(
        '/v2/api/client/user/nutrition-plan',
        dto,
      );
      return data;
    } catch (error) {
      console.error('Error creating personal BMI entry:', error);
      throw error;
    }
  },

  getBmi: async () => {
    try {
      const { data } = await httpClient.get<GetBmiResponse>(
        `/v2/api/client/user/nutrition-plan`,
      );

      return data.data;
    } catch (error) {
      console.error('Error fetching BMI data:', error);
      throw error;
    }
  },
};
