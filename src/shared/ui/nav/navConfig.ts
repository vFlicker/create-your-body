import chat from '~/shared/assets/nav/chat.svg';
import dashboard from '~/shared/assets/nav/dashboard.svg';
import food from '~/shared/assets/nav/food.svg';
import muscles from '~/shared/assets/nav/musclesBlack.svg';
import profile from '~/shared/assets/nav/user.svg';
import { AppRoute } from '~/shared/router';

type NavItem = {
  to: AppRoute;
  iconSrc: string;
  text: string;
  disabled?: boolean;
};

export const navConfig: NavItem[] = [
  { to: AppRoute.Dashboard, iconSrc: dashboard, text: 'Меню' },
  {
    to: AppRoute.TrainingCategories,
    iconSrc: muscles,
    text: 'Тренировки',
  },
  {
    to: AppRoute.FoodCategories,
    iconSrc: food,
    text: 'Питание',
  },
  { to: AppRoute.Communication, iconSrc: chat, text: 'Общение' },
  { to: AppRoute.StartProfile, iconSrc: profile, text: 'Профиль' },
];
