import { httpClient } from '~/shared/api/httpClient';

import {
  CreateMeasurementsDto,
  GetMeasurementsByIdResponse,
  GetMeasurementsListResponse,
  GetTransformationPhotoResponse,
  UpdateMeasurementsDto,
} from '../measurementTypes';

export const measurementApiService = {
  getTransformationPhotos: async () => {
    try {
      const response = await httpClient.get<GetTransformationPhotoResponse>(
        `/v2/api/client/user/photos`,
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching transformation photos:', error);
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
      console.error('Error updating transformation photos:', error);
      throw error;
    }
  },

  createMeasurements: async ({ dto }: { dto: CreateMeasurementsDto }) => {
    try {
      const response = await httpClient.post(
        `/v2/api/client/user/measurements`,
        dto,
      );
      return response;
    } catch (error) {
      console.error('Error adding measurements:', error);
      throw error;
    }
  },

  getMeasurementsList: async () => {
    try {
      const { data } = await httpClient.get<GetMeasurementsListResponse>(
        `/v2/api/client/user/measurements`,
      );
      return data.data.measurements;
    } catch (error) {
      console.error('Error fetching measurements:', error);
      throw error;
    }
  },

  getMeasurementsById: async (id: string) => {
    try {
      const { data } = await httpClient.get<GetMeasurementsByIdResponse>(
        `/v2/api/client/user/measurements/${id}`,
      );
      return data.data.measurement;
    } catch (error) {
      console.error('Error fetching measurements by ID:', error);
      throw error;
    }
  },

  updateMeasurements: async ({
    id,
    dto,
  }: {
    id: number;
    dto: UpdateMeasurementsDto;
  }) => {
    try {
      const response = await httpClient.put(
        `/v2/api/client/user/measurements/${id}`,
        dto,
      );
      return response;
    } catch (error) {
      console.error('Error updating measurements:', error);
      throw error;
    }
  },
};
