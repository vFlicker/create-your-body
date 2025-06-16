import axios from 'axios';

import { BASE_API_URL, httpClient } from '~/shared/api/httpClient';

import {
  CreateBodyMeasurementsDto,
  GetBodyMeasurementsResponse,
  GetTransformationPhotoResponse,
  GetUserResponse,
  UpdateBodyMeasurementsDto,
  UpdateUserDto,
  UpdateVideoProgressDto,
} from '../userTypes';

export const userApiService = {
  getUser: async (userQuery: string) => {
    try {
      const { data } = await httpClient.get<GetUserResponse>(
        `/v2/api/client/user/me?${userQuery}`,
      );
      return data.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  updateUser: async ({
    userQuery,
    dto,
  }: {
    userQuery: string;
    dto: UpdateUserDto;
  }) => {
    try {
      const response = await httpClient.patch(
        `/v2/api/client/user/me?${userQuery}`,
        dto,
      );
      return response;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  getTransformationPhotos: async (userQuery: string) => {
    try {
      const response = await httpClient.get<GetTransformationPhotoResponse>(
        `/v2/api/client/user/photos?${userQuery}`,
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching user photo transformation:', error);
      throw error;
    }
  },

  updateTransformationPhotos: async ({
    userQuery,
    formData,
    stage,
  }: {
    userQuery: string;
    formData: FormData;
    stage: string;
  }) => {
    try {
      const response = await httpClient.post(
        `/v2/api/client/user/photos/${stage}?${userQuery}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return response;
    } catch (error) {
      console.error('Error updating user photo transformation:', error);
      throw error;
    }
  },

  createBodyMeasurements: async ({
    userQuery,
    dto,
  }: {
    userQuery: string;
    dto: CreateBodyMeasurementsDto;
  }) => {
    try {
      const response = await httpClient.post(
        `/v2/api/client/user/measurements?${userQuery}`,
        dto,
      );
      return response;
    } catch (error) {
      console.error('Error adding user parameters:', error);
      throw error;
    }
  },

  getBodyMeasurements: async (userQuery: string) => {
    try {
      const { data } = await httpClient.get<GetBodyMeasurementsResponse>(
        `/v2/api/client/user/measurements?${userQuery}`,
      );
      return data.data.measurements;
    } catch (error) {
      console.error('Error fetching user parameters:', error);
      throw error;
    }
  },

  updateBodyMeasurements: async ({
    userQuery,
    id,
    dto,
  }: {
    userQuery: string;
    id: number;
    dto: UpdateBodyMeasurementsDto;
  }) => {
    try {
      const response = await httpClient.put(
        `/v2/api/client/user/measurements/${id}?${userQuery}`,
        dto,
      );
      return response;
    } catch (error) {
      console.error('Error updating user parameters:', error);
      throw error;
    }
  },

  addUserAvatarById: async ({ id, image }: { id: number; image: string }) => {
    console.info('This method is deprecated');

    try {
      await axios.post(
        `${BASE_API_URL}/api/v1/user/image?user_tg_id=${id}&image=${image}`,
        null,
        { headers: { 'Content-Type': 'application/json' } },
      );
    } catch (error) {
      console.error('Error adding user avatar:', error);
      throw error;
    }
  },

  updateGreetVideoProgress: async ({
    tgId,
    duration,
  }: {
    tgId: number;
    duration: string;
  }) => {
    console.info('This method is deprecated');

    try {
      await axios.patch(`${BASE_API_URL}/api/v1/user/video/greet`, null, {
        params: {
          tg_id: tgId,
          duration_view: duration,
        },
      });
    } catch (error) {
      console.error('Error updating welcome video progress:', error);
      throw error;
    }
  },

  updateVideoProgress: async ({ dto }: { dto: UpdateVideoProgressDto }) => {
    console.info('This method is deprecated');

    try {
      await axios.patch(`${BASE_API_URL}/api/v1/user/video`, {
        user_tg_id: dto.userId,
        last_video: dto.lastVideo || dto.page,
        last_video_time: dto.last_video_time,
        last_video_link: dto.videoSrc,
        last_video_duration: dto.last_video_duration,
      });
    } catch (error) {
      console.error('Error updating video progress:', error);
      throw error;
    }
  },
};
