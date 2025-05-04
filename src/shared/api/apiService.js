import {
  addUserParametersAdapter,
  getUserAdapter,
  getUserParametersAdapter,
  updateUserAdapter,
  updateUserParametersAdapter,
} from './dataAdapter';
import { httpClient } from './httpClient';

export const apiService = {
  getUserByQuery: async (userQuery) => {
    try {
      const { data } = await httpClient.get(
        `/v2/api/client/user/me?${userQuery}`,
      );
      const adaptedUser = getUserAdapter(data.data);
      return adaptedUser;
    } catch (error) {
      console.error('Error fetching user by query id:', error);
      throw error;
    }
  },

  updateUser: async (userQuery, userData) => {
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

  /**
   * response example:
   * ```
   * FF D8 FF E0 00 10 4A 46
   * ```
   *
   * @param {'after' | 'before'} stage
   */
  getUserTransformationPhoto: async (userId, stage) => {
    const number = { before: 0, after: 1 };

    try {
      const response = await httpClient.get(
        `/api/v1/user/images/two?tg_id=${userId}&number=${number[stage]}`,
        { responseType: 'blob' },
      );
      return response;
    } catch (error) {
      console.error('Error fetching user photo before transformation:', error);
      throw error;
    }
  },

  /**
   * request example:
   * ```
   * FormData
   *   image: (binary)
   *   tg_id: 5003100894
   *   image_before: (binary)
   * ```
   *
   * response example:
   * ```
   * {
   *   "status": "success",
   *   "message": "Image posted"
   * }
   */
  updateUserTransformationPhoto: async (formData) => {
    try {
      const response = await httpClient.post(
        `/api/v1/user/images/two`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return response;
    } catch (error) {
      console.error('Error updating user photo before transformation:', error);
      throw error;
    }
  },

  addUserBodyParameters: async (userQuery, parameters) => {
    try {
      const adaptedParameters = addUserParametersAdapter(parameters);
      const response = await httpClient.post(
        `/v2/api/client/user/measurements?${userQuery}`,
        adaptedParameters,
      );
      return response;
    } catch (error) {
      console.error('Error updating user parameters:', error);
      throw error;
    }
  },

  getUserParameters: async (userQuery) => {
    try {
      const response = await httpClient.get(
        `/v2/api/client/user/measurements?${userQuery}`,
      );
      const adaptedUserParameters = getUserParametersAdapter(
        response.data.data.measurements,
      );
      return adaptedUserParameters;
    } catch (error) {
      console.error('Error fetching user parameters:', error);
      throw error;
    }
  },

  updateUserBodyParameters: async (userQuery, id, parameters) => {
    try {
      const adaptedParameters = updateUserParametersAdapter(parameters);
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
