import { httpClient } from '~/shared/api/httpClient';

import {
  CreateBodyMeasurementsDto,
  GetBodyMeasurementsResponse,
  GetTransformationPhotoResponse,
  UpdateBodyMeasurementsDto,
} from '../measurementTypes';

export const measurementApiService = {
  getTransformationPhotos: async () => {
    try {
      const response = await httpClient.get<GetTransformationPhotoResponse>(
        `/v2/api/client/user/photos`,
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching user photo transformation:', error);
      throw error;
    }
  },

  updateTransformationPhotos: async ({
    stage,
    formData,
  }: {
    stage: string;
    formData: FormData;
  }) => {
    try {
      const response = await httpClient.post(
        `/v2/api/client/user/photos/${stage}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      return response;
    } catch (error) {
      console.error('Error updating user photo transformation:', error);
      throw error;
    }
  },

  createBodyMeasurements: async ({
    dto,
  }: {
    dto: CreateBodyMeasurementsDto;
  }) => {
    try {
      const response = await httpClient.post(
        `/v2/api/client/user/measurements`,
        dto,
      );
      return response;
    } catch (error) {
      console.error('Error adding user parameters:', error);
      throw error;
    }
  },

  getBodyMeasurements: async () => {
    try {
      const { data } = await httpClient.get<GetBodyMeasurementsResponse>(
        `/v2/api/client/user/measurements`,
      );
      return data.data.measurements;
    } catch (error) {
      console.error('Error fetching user parameters:', error);
      throw error;
    }
  },

  updateBodyMeasurements: async ({
    id,
    dto,
  }: {
    id: number;
    dto: UpdateBodyMeasurementsDto;
  }) => {
    try {
      const response = await httpClient.put(
        `/v2/api/client/user/measurements/${id}`,
        dto,
      );
      return response;
    } catch (error) {
      console.error('Error updating user parameters:', error);
      throw error;
    }
  },
};
