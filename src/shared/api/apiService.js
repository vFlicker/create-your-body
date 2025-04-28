import { httpClient } from './httpClient';

export const apiService = {
  /**
   *  response example:
   *  ```
   *  "data": {
   *    "name": "Влад",
   *    "user_tarif": "Тариф Pro",
   *    "image_before": null,
   *    "id": 3072,
   *    "user_level": "Профи",
   *    "image_after": null,
   *    "order_id": "wua7ubt2THHHYYMepBa0purpl",
   *    "check": true,
   *    "order_created_at": null,
   *    "last_video": null,
   *    "tg_id": "5003100894",
   *    "order_ended_at": null,
   *    "last_video_time": null,
   *    "phone": "+799174367788",
   *    "account_create_at": "2025-03-29T14:31:42.223845",
   *    "last_video_link": null,
   *    "born_date": "1997-09-26",
   *    "email": null,
   *    "last_video_duration": null,
   *    "sex": "male",
   *    "image": "https://t.me/i/userpic/320/uDnD8SAXAvwYTy_EsnWuicjYOryNK03zY2-bxDXnzn9GogyZmGEjYaD9xuNa7Glc.svg",
   *    "greet_video_time_view": null
   *  }
   * ```
   */
  getUserByTgId: async (tgId) => {
    try {
      const { data } = await httpClient.get(`/api/v1/user?user_id=${tgId}`);
      return data;
    } catch (error) {
      console.error('Error fetching user by tgId:', error);
      throw error;
    }
  },
};
