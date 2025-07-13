import { useQuery } from '@tanstack/react-query';

import { subscriptionApiService } from './subscriptionApiService';

export const useSubscriptions = () => {
  const { data, isPending } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: subscriptionApiService.getSubscriptions,
  });

  return { subscriptions: data, isSubscriptionsPending: isPending };
};
