export type Subscription = {
  id: number;
  userId: number;
  plan: 'Base' | 'Pro';
  startedAt: string;
  expiresAt: string;
  orderNumber: string | null;
  orderId: string;
  status: 'active' | 'expired' | 'cancelled' | 'pre';
  stream: number;
  createdAt: string;
};

export type GetSubscriptionsResponse = {
  sussess: boolean;
  message: string;
  data: {
    subscriptions: Subscription[];
  };
};
