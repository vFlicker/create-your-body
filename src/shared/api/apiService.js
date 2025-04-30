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
   */
  getUserPhotoBeforeTransformation: async (userId) => {
    try {
      const response = await httpClient.get(
        `/api/v1/user/images/two?tg_id=${userId}&number=0`,
        { responseType: 'blob' },
      );
      return response;
    } catch (error) {
      console.error('Error fetching user photo before transformation:', error);
      throw error;
    }
  },

  /**
   * response example:
   * ```
   * FF D8 FF E0 00 10 4A 46
   * ```
   */
  getUserPhotoAfterTransformation: async (userId) => {
    try {
      const response = await httpClient.get(
        `/api/v1/user/images/two?tg_id=${userId}&number=1`,
        { responseType: 'blob' },
      );
      return response;
    } catch (error) {
      console.error('Error fetching user photo after transformation:', error);
      throw error;
    }
  },
};
