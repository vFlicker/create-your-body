import axios from 'axios';

import { BASE_API_URL, httpClient } from '~/shared/api/httpClient';

import {
  BodyMeasurementsResponse,
  CreateBodyMeasurementsDto,
  TransformationPhotosResponse,
  User,
} from '../userTypes';

type VideoProgressUpdateData = {
  userId: string | number;
  last_video_time: string;
  last_video_duration: string;
  videoSrc: string;
  page?: number | string;
  lastVideo?: number | string;
};

const getUserAdapter = (user: User) => ({
  born_date: user.bornDate ? user.bornDate.split('T')[0] : null,
  check: true,
  email: user.email || null,
  greet_video_time_view: null,
  id: user.id,
  image: user.userpic || null,
  image_after: null,
  image_before: null,
  last_video: null,
  last_video_duration: null,
  last_video_link: null,
  last_video_time: null,
  name: user.name,
  order_created_at:
    user.subscriptions && user.subscriptions[0]
      ? user.subscriptions[0].startedAt
      : null,
  order_ended_at:
    user.subscriptions && user.subscriptions[0]
      ? user.subscriptions[0].expiresAt
      : null,
  order_id:
    user.subscriptions && user.subscriptions[0]
      ? user.subscriptions[0].orderId
      : null,
  phone: user.phone,
  sex: user.sex,
  tg_id: user.tgId ? String(user.tgId) : null,
  user_level: user.level as 'Профи' | 'Новичок',
  user_tarif:
    user.subscriptions && user.subscriptions[0]
      ? `Тариф ${user.subscriptions[0].plan}`
      : null,
  subscriptions: user.subscriptions,
});

const updateUserAdapter = (user) => ({
  name: user?.name,
  bornDate: user.born_date ? new Date(user.born_date).toISOString() : undefined,
  sex: user?.sex,
  level: user?.user_level,
  phone: user?.phone,
});

const updateParametersAdapter = (parameters) => ({
  waist: parameters.waist,
  legs: parameters.legs,
  weight: parameters.weight,
  chest: parameters.chest,
  abdominalCircumference: parameters.abdominal_circumference,
  hips: parameters.hips,
});

export const userApiService = {
  getUser: async (userQuery: string) => {
    try {
      const { data } = await httpClient.get(
        `/v2/api/client/user/me?${userQuery}`,
      );
      const adaptedUser = getUserAdapter(data.data);
      return adaptedUser;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  updateUser: async ({
    userQuery,
    userData,
  }: {
    userQuery: string;
    userData: any;
  }) => {
    try {
      const adaptedUserData = updateUserAdapter(userData);
      const response = await httpClient.patch(
        `/v2/api/client/user/me?${userQuery}`,
        adaptedUserData,
      );
      return response;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  getTransformationPhotos: async (userQuery: string) => {
    try {
      const response = await httpClient.get<TransformationPhotosResponse>(
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
    data,
  }: {
    userQuery: string;
    data: CreateBodyMeasurementsDto;
  }) => {
    try {
      const response = await httpClient.post(
        `/v2/api/client/user/measurements?${userQuery}`,
        data,
      );
      return response;
    } catch (error) {
      console.error('Error adding user parameters:', error);
      throw error;
    }
  },

  getBodyMeasurements: async (userQuery: string) => {
    try {
      const { data } = await httpClient.get<BodyMeasurementsResponse>(
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
    parameters,
  }: {
    userQuery: string;
    id: number;
    parameters: {
      waist: number;
      legs: number;
      weight: number;
      chest: number;
      abdominal_circumference: number;
      hips: number;
    };
  }) => {
    try {
      const adaptedParameters = updateParametersAdapter(parameters);
      const response = await httpClient.put(
        `/v2/api/client/user/measurements/${id}?${userQuery}`,
        adaptedParameters,
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

  updateVideoProgress: async (data: VideoProgressUpdateData) => {
    console.info('This method is deprecated');

    try {
      await axios.patch(`${BASE_API_URL}/api/v1/user/video`, {
        user_tg_id: data.userId,
        last_video: data.lastVideo || data.page,
        last_video_time: data.last_video_time,
        last_video_link: data.videoSrc,
        last_video_duration: data.last_video_duration,
      });
    } catch (error) {
      console.error('Error updating video progress:', error);
      throw error;
    }
  },
};
