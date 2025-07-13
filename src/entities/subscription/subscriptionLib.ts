import { Subscription } from '../user/userTypes';

export const hasActiveSubscription = (
  subscriptions: Subscription[],
): boolean => {
  const now = new Date();
  return subscriptions.some((sub) => new Date(sub.expiresAt) > now);
};

export const formatSubscriptionDateRange = (
  startedAt: string,
  expiresAt: string,
): string => {
  const start = new Date(startedAt);
  const end = new Date(expiresAt);

  const formattedStart = start.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'short',
  });

  const formattedEnd = end.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return `${formattedStart} — ${formattedEnd}`;
};
