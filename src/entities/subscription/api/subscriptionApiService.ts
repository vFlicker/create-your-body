import { httpClient } from '~/shared/api/httpClient';

import { GetSubscriptionsResponse } from '../subscriptionTypes';

export const subscriptionApiService = {
  getSubscriptions: async () => {
    try {
      const { data } = await httpClient.get<GetSubscriptionsResponse>(
        `/v2/api/client/subscriptions`,
      );
      return data.data.subscriptions;
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      throw error;
    }
  },
};
