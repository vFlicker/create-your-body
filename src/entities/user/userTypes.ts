type User = {
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
  tgId: number | null;
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

export type BodyMeasurements = {
  id: number;
  userId: number;
  chest: number;
  waist: number;
  abdominalCircumference: number;
  legs: number;
  hips: number;
  weight: number;
  createdAt: string;
};

type TransformationPhoto = {
  id: number;
  userId: number;
  type: 'before' | 'after';
  fileId: string;
  url: string;
  uploadedAt: string;
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

export type CreateBodyMeasurementsDto = {
  tg_id: number;
  waist: number;
  legs: number;
  weight: number;
  chest: number;
  abdominalCircumference: number;
  hips: number;
};

export type UpdateBodyMeasurementsDto = {
  waist: number;
  legs: number;
  weight: number;
  chest: number;
  abdominalCircumference: number;
  hips: number;
};

export type GetTransformationPhotoResponse = {
  success: boolean;
  message: string;
  data: {
    before: TransformationPhoto | null;
    after: TransformationPhoto | null;
  };
};

export type GetBodyMeasurementsResponse = {
  success: boolean;
  message: string;
  data: {
    measurements: BodyMeasurements[];
  };
};

export type UpdateVideoProgressDto = {
  userId: string | number;
  last_video_time: string;
  last_video_duration: string;
  videoSrc: string;
  page?: number | string;
  lastVideo?: number | string;
};
