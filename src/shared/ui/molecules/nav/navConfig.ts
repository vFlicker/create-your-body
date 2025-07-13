import bookOpenIconSrc from '~/shared/assets/nav/book-open.svg';
import homeOpenIconSrc from '~/shared/assets/nav/home.svg';
import messageChatOpenIconSrc from '~/shared/assets/nav/message-chat.svg';
import userOpenIconSrc from '~/shared/assets/nav/user.svg';
import { AppRoute } from '~/shared/router';

type NavItem = {
  to: AppRoute | null;
  iconSrc: string;
  text: string;
  disabled: boolean;
};

export const getNavConfig = (hasAccess: boolean): NavItem[] => [
  {
    to: AppRoute.Dashboard,
    iconSrc: homeOpenIconSrc,
    text: 'Главная',
    disabled: false,
  },
  {
    to: AppRoute.Learning,
    iconSrc: bookOpenIconSrc,
    text: 'Обучение',
    disabled: !hasAccess,
  },
  {
    to: AppRoute.Communication,
    iconSrc: messageChatOpenIconSrc,
    text: 'Общение',
    disabled: false,
  },

  {
    to: AppRoute.Profile,
    iconSrc: userOpenIconSrc,
    text: 'Профиль',
    disabled: false,
  },
];
