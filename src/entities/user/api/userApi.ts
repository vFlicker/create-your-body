import { httpClient } from '~/shared/api/httpClient';

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
  user_level: user.level,
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

export const getParametersAdapter = (parameters) => {
  return parameters.map((item) => ({
    abdominal_circumference: item.abdominalCircumference,
    chest: item.chest,
    created_at: item.createdAt,
    hips: item.hips,
    id: item.id,
    legs: item.legs,
    tg_id: item.userId,
    waist: item.waist,
    weight: item.weight,
  }));
};

export const addParametersAdapter = (parameters) => ({
  waist: parameters.waist,
  legs: parameters.legs,
  weight: parameters.weight,
  chest: parameters.chest,
  abdominalCircumference: parameters.abdominal_circumference,
  hips: parameters.hips,
});

export const updateParametersAdapter = (parameters) => ({
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

  updateUser: async ({ userQuery, userData }) => {
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

  getTransformationPhotos: async (userQuery) => {
    try {
      const response = await httpClient.get(
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
    parameters,
  }: {
    userQuery: string;
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
      const adaptedParameters = addParametersAdapter(parameters);
      const response = await httpClient.post(
        `/v2/api/client/user/measurements?${userQuery}`,
        adaptedParameters,
      );
      return response;
    } catch (error) {
      console.error('Error adding user parameters:', error);
      throw error;
    }
  },

  getBodyMeasurements: async (userQuery) => {
    try {
      const response = await httpClient.get(
        `/v2/api/client/user/measurements?${userQuery}`,
      );
      const adaptedUserParameters = getParametersAdapter(
        response.data.data.measurements,
      );
      return adaptedUserParameters;
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
};
