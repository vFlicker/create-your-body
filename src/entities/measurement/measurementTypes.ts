export type Measurements = {
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

export type CreateMeasurementsDto = {
  tg_id: number;
  waist: number;
  legs: number;
  weight: number;
  chest: number;
  abdominalCircumference: number;
  hips: number;
};

export type UpdateMeasurementsDto = {
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

export type GetMeasurementsResponse = {
  success: boolean;
  message: string;
  data: {
    measurements: Measurements[];
  };
};
