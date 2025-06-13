import { Subscription } from '../userTypes';

export const getMaxStream = (subscriptions: Subscription[]): number => {
  return subscriptions.reduce((max, { stream }) => {
    return stream > max ? stream : max;
  }, 0);
};
