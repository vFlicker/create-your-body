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

export type User = {
  id: number;
  email: string;
  name: string;
  phone: string;
  bornDate: string;
  sex: string;
  createdAt: string;
  level: string;
  tgId: number | null;
  getcourseId: string | null;
  paymentBotId: string | null;
  userpic: string | null;
  debugMode: boolean;
  role: string;
  subscriptions: Subscription[];
};

type TransformationPhoto = {
  id: number;
  userId: number;
  type: 'before' | 'after';
  fileId: string;
  url: string;
  uploadedAt: string;
};

export type TransformationPhotosResponse = {
  success: boolean;
  message: string;
  data: {
    before: TransformationPhoto | null;
    after: TransformationPhoto | null;
  };
};
