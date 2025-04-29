import { userAdapter } from './dataAdapter';
import { httpClient } from './httpClient';

export const apiService = {
  /**
   * response example:
   * ```
   * {
   *   "name": "Влад",
   *   "user_tarif": "Тариф Pro",
   *   "image_before": null,
   *   "id": 3072,
   *   "user_level": "Профи",
   *   "image_after": null,
   *   "order_id": "wua7ubt2THHHYYMepBa0purpl",
   *   "check": true,
   *   "order_created_at": null,
   *   "last_video": null,
   *   "tg_id": "5003100894",
   *   "order_ended_at": null,
   *   "last_video_time": null,
   *   "phone": "+799174367788",
   *   "account_create_at": "2025-03-29T14:31:42.223845",
   *   "last_video_link": null,
   *   "born_date": "1997-09-26",
   *   "email": null,
   *   "last_video_duration": null,
   *   "sex": "male",
   *   "image": "https://t.me/i/userpic/320/uDnD8SAXAvwYTy_EsnWuicjYOryNK03zY2-bxDXnzn9GogyZmGEjYaD9xuNa7Glc.svg",
   *   "greet_video_time_view": null
   * }
   * ```
   */
  getUserById: async (id) => {
    try {
      console.error('deprecated method');
      const { data } = await httpClient.get(`/api/v1/user?user_id=${id}`);
      return data;
    } catch (error) {
      console.error('Error fetching user by tgId:', error);
      throw error;
    }
  },

  getUserByQuery: async (queryId) => {
    try {
      const { data } = await httpClient.get(
        `/v2/api/client/user/me?${queryId}`,
      );
      const adaptedUser = userAdapter(data.data);
      return adaptedUser;
    } catch (error) {
      console.error('Error fetching user by query id:', error);
      throw error;
    }
  },

  /**
   * request example:
   * ```
   * {
   *   "tg_id": "5003100894",
   *   "name": "Влад",
   *   "born_date": "1997-09-26",
   *   "sex": "male",
   *   "user_level": "Профи",
   *   "phone": "+79999999999"
   * }
   * ```
   *
   * response example:
   * ```
   * {
   *   status: 'success'
   * }
   * ```
   */
  updateUser: async (userData) => {
    try {
      const response = await httpClient.patch(`/api/v1/user`, userData);
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
