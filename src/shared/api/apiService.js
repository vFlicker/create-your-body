import { createUserAdapter, getUserAdapter } from './dataAdapter';
import { httpClient } from './httpClient';

export const apiService = {
  getUserByQuery: async (queryId) => {
    try {
      const { data } = await httpClient.get(
        `/v2/api/client/user/me?${queryId}`,
      );
      const adaptedUser = getUserAdapter(data.data);
      return adaptedUser;
    } catch (error) {
      console.error('Error fetching user by query id:', error);
      throw error;
    }
  },

  updateUser: async (queryId, userData) => {
    try {
      const adaptedUserData = createUserAdapter(userData);
      const response = await httpClient.patch(
        `/v2/api/client/user/me?${queryId}`,
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
};
