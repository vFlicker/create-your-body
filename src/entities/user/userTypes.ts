export type User = {
  bornDate: string;
  createdAt: string;
  debugMode: boolean;
  email: string;
  getcourseId: string | null;
  id: number;
  level: 'Профи' | 'Новичок';
  name: string;
  paymentBotId: string | null;
  phone: string;
  role: string;
  sex: 'male' | 'female';
  subscriptions: Subscription[];
  tgId: number;
  userpic: string | null;
};

export type Subscription = {
  id: number;
  userId: number;
  plan: string;
  startedAt: string;
  expiresAt: string;
  orderNumber: string | null;
  orderId: string | null;
  status: string;
  stream: number;
  createdAt: string;
};

export type GetUserResponse = {
  success: boolean;
  message: string;
  data: User;
};

export type UpdateUserDto = {
  name?: string;
  bornDate?: string;
  sex?: string;
  level?: string;
  phone?: string;
};

export type UpdateVideoProgressDto = {
  userId: string | number;
  last_video_time: string;
  last_video_duration: string;
  videoSrc: string;
  page?: number | string;
  lastVideo?: number | string;
};
