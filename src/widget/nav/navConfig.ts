import chat from '~/shared/assets/nav/chat.svg';
import dashboard from '~/shared/assets/nav/dashboard.svg';
import food from '~/shared/assets/nav/food.svg';
import muscles from '~/shared/assets/nav/musclesBlack.svg';
import profile from '~/shared/assets/nav/user.svg';
import { AppRoute } from '~/shared/router';

export const navConfig = [
  { to: AppRoute.Dashboard, iconSrc: dashboard, label: 'Меню' },
  {
    to: AppRoute.Traning,
    iconSrc: muscles,
    label: 'Тренировки',
  },
  {
    to: AppRoute.Food,
    iconSrc: food,
    label: 'Питание',
  },
  { to: AppRoute.Communication, iconSrc: chat, label: 'Общение' },
  { to: AppRoute.Profile, iconSrc: profile, label: 'Профиль' },
];
