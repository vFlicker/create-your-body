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

  const thirdSteam = subscriptions.find((sub) => sub.stream === 3);
  const fourthSteam = subscriptions.find((sub) => sub.stream === 4);

  const isThirdSteamPro = thirdSteam && thirdSteam.plan === 'Pro';
  const isFourthSteamPro = fourthSteam && fourthSteam.plan === 'Pro';
  const isThirdSteamBase = thirdSteam && thirdSteam.plan === 'Base';
  const isFourthSteamBase = fourthSteam && fourthSteam.plan === 'Base';

  // Always open
  pageContainersData.push({
    to: AppRoute.Begin,
    title: 'Введение',
    iconSrc: healthIconSrc,
    disabled: false,
    isHighlight: true,
  });

  if (isThirdSteamPro) {
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
  } else if (isThirdSteamBase && isFourthSteamPro) {
    pageContainersData.push(
      {
        title: 'Тренировки',
        iconSrc: musculesIconSrc,
        disabled: false,
        to: AppRoute.TrainingCategories,
        isHighlight: false,
      },
      {
        title: 'Питание',
        iconSrc: foodIconSrc,
        disabled: false,
        to: AppRoute.FoodCategories,
        isHighlight: false,
      },
      {
        to: AppRoute.LectureWeeks,
        title: 'Лекции',
        iconSrc: bookIconSrc,
        labelText: 'Доступно с 29 сентября',
        disabled: true,
        isHighlight: false,
      },
      {
        to: AppRoute.RecipeCategories,
        title: 'Рецепты',
        iconSrc: recipesIconSrc,
        labelText: 'Доступно с 29 сентября',
        disabled: true,
        isHighlight: false,
      },
    );
  } else if (isFourthSteamPro) {
    // all open 29 сентября
    pageContainersData.push(
      {
        to: AppRoute.TrainingCategories,
        title: 'Тренировки',
        iconSrc: musculesIconSrc,
        labelText: 'Доступно с 29 сентября',
        disabled: true,
        isHighlight: false,
      },
      {
        to: AppRoute.FoodCategories,
        title: 'Питание',
        iconSrc: foodIconSrc,
        labelText: 'Доступно с 29 сентября',
        disabled: true,
        isHighlight: false,
      },
      {
        to: AppRoute.LectureWeeks,
        title: 'Лекции',
        iconSrc: bookIconSrc,
        labelText: 'Доступно с 29 сентября',
        disabled: true,
        isHighlight: false,
      },
      {
        to: AppRoute.RecipeCategories,
        title: 'Рецепты',
        iconSrc: recipesIconSrc,
        labelText: 'Доступно с 29 сентября',
        disabled: true,
        isHighlight: false,
      },
    );
  } else if (isThirdSteamBase) {
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
  } else if (isFourthSteamBase) {
    // lectures and recipes -- buy, else '29 сентября'
    pageContainersData.push(
      {
        to: AppRoute.TrainingCategories,
        title: 'Тренировки',
        iconSrc: musculesIconSrc,
        labelText: 'Доступно с 29 сентября',
        disabled: true,
        isHighlight: false,
      },
      {
        to: AppRoute.FoodCategories,
        title: 'Питание',
        iconSrc: foodIconSrc,
        labelText: 'Доступно с 29 сентября',
        disabled: true,
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
