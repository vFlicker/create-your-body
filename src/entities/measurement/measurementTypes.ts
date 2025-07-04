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
