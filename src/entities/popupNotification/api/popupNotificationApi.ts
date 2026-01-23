import { httpClient } from '~/shared/api/httpClient';

import type { PopupNotification } from '../popupNotificationTypes';

type GetPopupNotificationsResponse = {
  success: boolean;
  data: {
    notifications: PopupNotification[];
  };
};

export const popupNotificationApi = {
  getNotifications: async (since?: string): Promise<PopupNotification[]> => {
    const params = since ? { since } : undefined;
    const { data } = await httpClient.get<GetPopupNotificationsResponse>(
      '/v2/api/client/notifications/popup',
      { params },
    );
    return data.data.notifications;
  },

  dismissNotification: async (notificationId: number): Promise<void> => {
    await httpClient.post(
      `/v2/api/client/notifications/popup/${notificationId}/dismiss`,
    );
  },

  readNotification: async (notificationId: number): Promise<void> => {
    await httpClient.post(
      `/v2/api/client/notifications/popup/${notificationId}/read`,
    );
  },
};
