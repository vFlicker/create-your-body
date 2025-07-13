import { Subscription } from '~/entities/user/userTypes';
import bookIconSrc from '~/shared/assets/svg/book.svg';
import foodIconSrc from '~/shared/assets/svg/food.svg';
import healthIconSrc from '~/shared/assets/svg/health.svg';
import musculesIconSrc from '~/shared/assets/svg/musclesBlack.svg';
import recipesIconSrc from '~/shared/assets/svg/recipes.svg';
import { AppRoute } from '~/shared/router';

type CardData = {
  to: AppRoute;
  title: string;
  iconSrc: string;
  disabled: boolean;
  isHighlight: boolean;
  labelText?: string;
  labelIconSrc?: string;
};

export const getTitleCards = (subscriptions: Subscription[]) => {
  const pageContainersData: CardData[] = [];

  const secondSteam = subscriptions.find((sub) => sub.stream === 2);
  const thirdSteam = subscriptions.find((sub) => sub.stream === 3);

  const secondSteamIsPro = secondSteam && secondSteam.plan === 'Pro';
  const thirdSteamIsPro = thirdSteam && thirdSteam.plan === 'Pro';
  const secondSteamBase = secondSteam && secondSteam.plan === 'Base';
  const thirdSteamBase = thirdSteam && thirdSteam.plan === 'Base';

  // Always open
  pageContainersData.push({
    to: AppRoute.Begin,
    title: 'Введение',
    iconSrc: healthIconSrc,
    disabled: false,
    isHighlight: true,
  });

  if (secondSteamIsPro) {
    // All open
    pageContainersData.push(
      {
        to: AppRoute.TrainingCategories,
        title: 'Тренировки',
        iconSrc: musculesIconSrc,
        disabled: false,
        isHighlight: false,
      },
      {
        to: AppRoute.FoodCategories,
        title: 'Питание',
        iconSrc: foodIconSrc,
        disabled: false,
        isHighlight: false,
      },
      {
        to: AppRoute.LectureWeeks,
        title: 'Лекции',
        iconSrc: bookIconSrc,
        disabled: false,
        isHighlight: false,
      },
      {
        to: AppRoute.RecipeCategories,
        title: 'Рецепты',
        iconSrc: recipesIconSrc,
        disabled: false,
        isHighlight: false,
      },
    );
  } else if (thirdSteamIsPro) {
    // all open
    pageContainersData.push(
      {
        to: AppRoute.TrainingCategories,
        title: 'Тренировки',
        iconSrc: musculesIconSrc,
        disabled: false,
        isHighlight: false,
      },
      {
        to: AppRoute.FoodCategories,
        title: 'Питание',
        iconSrc: foodIconSrc,
        disabled: false,
        isHighlight: false,
      },
      {
        to: AppRoute.LectureWeeks,
        title: 'Лекции',
        iconSrc: bookIconSrc,
        disabled: false,
        isHighlight: false,
      },
      {
        to: AppRoute.RecipeCategories,
        title: 'Рецепты',
        iconSrc: recipesIconSrc,
        disabled: false,
        isHighlight: false,
      },
    );
  } else if (secondSteamBase) {
    // lectures and recipes -- buy, else access
    pageContainersData.push(
      {
        to: AppRoute.TrainingCategories,
        title: 'Тренировки',
        iconSrc: musculesIconSrc,
        disabled: false,
        isHighlight: false,
      },
      {
        to: AppRoute.FoodCategories,
        title: 'Питание',
        iconSrc: foodIconSrc,
        disabled: false,
        isHighlight: false,
      },
      {
        to: AppRoute.LectureWeeks,
        title: 'Лекции',
        iconSrc: bookIconSrc,
        disabled: true,
        labelText: 'Доступно в PRO',
        isHighlight: false,
      },
      {
        to: AppRoute.RecipeCategories,
        title: 'Рецепты',
        iconSrc: recipesIconSrc,
        disabled: true,
        labelText: 'Доступно в PRO',
        isHighlight: false,
      },
    );
  } else if (thirdSteamBase) {
    // lectures and recipes -- buy, else '12 июля'
    pageContainersData.push(
      {
        to: AppRoute.TrainingCategories,
        title: 'Тренировки',
        iconSrc: musculesIconSrc,
        disabled: false,
        isHighlight: false,
      },
      {
        to: AppRoute.FoodCategories,
        title: 'Питание',
        iconSrc: foodIconSrc,
        disabled: false,
        isHighlight: false,
      },
      {
        to: AppRoute.LectureWeeks,
        title: 'Лекции',
        iconSrc: bookIconSrc,
        disabled: true,
        labelText: 'Доступно в PRO',
        isHighlight: false,
      },
      {
        to: AppRoute.RecipeCategories,
        title: 'Рецепты',
        iconSrc: recipesIconSrc,
        disabled: true,
        labelText: 'Доступно в PRO',
        isHighlight: false,
      },
    );
  }

  return pageContainersData;
};
