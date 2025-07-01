import chatIconSrc from '~/shared/assets/nav/chat.svg';
import dashboardIconSrc from '~/shared/assets/nav/dashboard.svg';
import foodIconSrc from '~/shared/assets/nav/food.svg';
import musclesIconSrc from '~/shared/assets/nav/musclesBlack.svg';
import profileIconSrc from '~/shared/assets/nav/user.svg';
import { AppRoute } from '~/shared/router';

type NavItem = {
  to: AppRoute | null;
  iconSrc: string;
  text: string;
  disabled: boolean;
};

export const getNavConfig = (isBlockFoodAndTrain: boolean): NavItem[] => [
  {
    to: AppRoute.Dashboard,
    iconSrc: dashboardIconSrc,
    text: 'Меню',
    disabled: false,
  },
  {
    to: !isBlockFoodAndTrain ? AppRoute.TrainingCategories : null,
    iconSrc: musclesIconSrc,
    text: 'Тренировки',
    disabled: !isBlockFoodAndTrain,
  },
  {
    to: !isBlockFoodAndTrain ? AppRoute.FoodCategories : null,
    iconSrc: foodIconSrc,
    text: 'Питание',
    disabled: !isBlockFoodAndTrain,
  },
  {
    to: AppRoute.Communication,
    iconSrc: chatIconSrc,
    text: 'Общение',
    disabled: false,
  },
  {
    to: AppRoute.StartProfile,
    iconSrc: profileIconSrc,
    text: 'Профиль',
    disabled: false,
  },
];
