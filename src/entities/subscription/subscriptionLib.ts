import { Subscription } from '../user/userTypes';

export const hasActiveSubscription = (
  subscriptions: Subscription[],
): boolean => {
  if (!subscriptions.length) return false;
  const [first] = subscriptions;
  return new Date(first.expiresAt) > new Date();
};
