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

// const updateUserAdapter = (user) => ({
//   name: user?.name,
//   bornDate: user.born_date ? new Date(user.born_date).toISOString() : undefined,
//   sex: user?.sex,
//   level: user?.user_level,
//   phone: user?.phone,
// });

// const getUserParametersAdapter = (parameters) => {
//   return parameters.map((item) => ({
//     abdominal_circumference: item.abdominalCircumference,
//     chest: item.chest,
//     created_at: item.createdAt,
//     hips: item.hips,
//     id: item.id,
//     legs: item.legs,
//     tg_id: item.userId,
//     waist: item.waist,
//     weight: item.weight,
//   }));
// };

export const userApi = {
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

  // updateUser: async (userQuery, userData) => {
  //   try {
  //     const adaptedUserData = updateUserAdapter(userData);
  //     const response = await httpClient.patch(
  //       `/v2/api/client/user/me?${userQuery}`,
  //       adaptedUserData,
  //     );
  //     return response;
  //   } catch (error) {
  //     console.error('Error updating user:', error);
  //     throw error;
  //   }
  // },

  // getUserTransformationPhoto: async (userQuery) => {
  //   try {
  //     const response = await httpClient.get(
  //       `/v2/api/client/user/photos?${userQuery}`,
  //     );
  //     return response.data.data;
  //   } catch (error) {
  //     console.error('Error fetching user photo transformation:', error);
  //     throw error;
  //   }
  // },

  // /**
  //  * @param {string} userQuery
  //  * @param {FormData} formData
  //  * @param {'after' | 'before'} stage
  //  */
  // updateUserTransformationPhoto: async (userQuery, formData, stage) => {
  //   try {
  //     const response = await httpClient.post(
  //       `/v2/api/client/user/photos/${stage}?${userQuery}`,
  //       formData,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       },
  //     );
  //     return response;
  //   } catch (error) {
  //     console.error('Error updating user photo transformation:', error);
  //     throw error;
  //   }
  // },

  // addUserBodyParameters: async (userQuery, parameters) => {
  //   try {
  //     const adaptedParameters = addUserParametersAdapter(parameters);
  //     const response = await httpClient.post(
  //       `/v2/api/client/user/measurements?${userQuery}`,
  //       adaptedParameters,
  //     );
  //     return response;
  //   } catch (error) {
  //     console.error('Error adding user parameters:', error);
  //     throw error;
  //   }
  // },

  // getUserParameters: async (userQuery) => {
  //   try {
  //     const response = await httpClient.get(
  //       `/v2/api/client/user/measurements?${userQuery}`,
  //     );
  //     const adaptedUserParameters = getUserParametersAdapter(
  //       response.data.data.measurements,
  //     );
  //     return adaptedUserParameters;
  //   } catch (error) {
  //     console.error('Error fetching user parameters:', error);
  //     throw error;
  //   }
  // },

  // updateUserBodyParameters: async (userQuery, id, parameters) => {
  //   try {
  //     const adaptedParameters = updateUserParametersAdapter(parameters);
  //     const response = await httpClient.put(
  //       `/v2/api/client/user/measurements/${id}?${userQuery}`,
  //       adaptedParameters,
  //     );
  //     return response;
  //   } catch (error) {
  //     console.error('Error updating user parameters:', error);
  //     throw error;
  //   }
  // },
};
