import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { useModalStore } from '~/entities/modal';
import {
  type PopupNotification,
  popupNotificationApi,
} from '~/entities/popupNotification';
import { useUser } from '~/entities/user';

import { PopupNotificationModal } from './PopupNotificationModal';

const POLLING_INTERVAL = 25000; // 25 seconds

export function usePopupNotifications(): void {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const openModal = useModalStore((store) => store.openModal);
  const closeAll = useModalStore((store) => store.closeAll);
  const modals = useModalStore((store) => store.modals);
  const shownNotificationIds = useRef<Set<number>>(new Set());
  const isShowingNotification = useRef(false);

  // Polling for new notifications
  const { data: polledNotifications } = useQuery({
    queryKey: ['popup-notifications'],
    queryFn: () => popupNotificationApi.getNotifications(),
    refetchInterval: POLLING_INTERVAL,
    enabled: !!user && !isShowingNotification.current,
  });

  // Combine notifications from /me and polling
  const notifications = polledNotifications ?? user?.popupNotifications ?? [];

  useEffect(() => {
    if (!notifications.length || isShowingNotification.current) return;

    const unreadNotifications = notifications.filter(
      (n) => !n.readAt && !shownNotificationIds.current.has(n.id),
    );

    if (unreadNotifications.length === 0) return;

    const notification = unreadNotifications[0];
    shownNotificationIds.current.add(notification.id);
    isShowingNotification.current = true;

    const handleDismiss = async () => {
      try {
        await popupNotificationApi.dismissNotification(notification.id);
        queryClient.invalidateQueries({ queryKey: ['popup-notifications'] });
        queryClient.invalidateQueries({ queryKey: ['current-user'] });
      } catch (error) {
        console.error('Failed to dismiss notification:', error);
      }
      isShowingNotification.current = false;
      closeAll();
    };

    const handleAction = async (
      action: PopupNotification['content']['buttons'][number]['action'],
    ) => {
      try {
        await popupNotificationApi.readNotification(notification.id);
        queryClient.invalidateQueries({ queryKey: ['popup-notifications'] });
        queryClient.invalidateQueries({ queryKey: ['current-user'] });
      } catch (error) {
        console.error('Failed to mark notification as read:', error);
      }

      if (action.type === 'url') {
        window.open(action.url, '_blank');
      }

      isShowingNotification.current = false;
      closeAll();
    };

    openModal(
      <PopupNotificationModal
        notification={notification}
        onAction={handleAction}
        onDismiss={handleDismiss}
      />,
      {
        onClose: async () => {
          if (!notification.content.settings.dismissible) {
            throw new Error('Notification is not dismissible');
          }
          await handleDismiss();
        },
      },
    );
  }, [notifications, openModal, closeAll, queryClient]);

  // Reset isShowingNotification when all modals are closed
  useEffect(() => {
    if (modals.length === 0) {
      isShowingNotification.current = false;
    }
  }, [modals.length]);
}
