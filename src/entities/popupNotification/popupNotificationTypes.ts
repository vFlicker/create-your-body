import type { TipTapNode } from '~/entities/cms2';

export type PopupNotification = {
  id: number;
  title: string;
  content: PopupNotificationContent;
  createdAt: string;
  readAt: string | null;
};

export type PopupNotificationContent = {
  media?: PopupNotificationMedia;
  blocks: TipTapNode[];
  buttons: PopupNotificationButton[];
  settings: {
    dismissible: boolean;
  };
};

export type PopupNotificationMedia = {
  type: 'carousel';
  items: PopupNotificationMediaItem[];
};

export type PopupNotificationMediaItem = {
  type: 'image';
  url: string;
};

export type PopupNotificationButton = {
  text: string;
  style: 'primary' | 'secondary' | 'link';
  action: PopupNotificationAction;
};

export type PopupNotificationAction =
  | { type: 'close' }
  | { type: 'url'; url: string };
