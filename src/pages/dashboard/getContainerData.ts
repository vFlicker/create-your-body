import { Subscription } from '~/entities/subscription';
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

  const steam4 = subscriptions.find((sub) => sub.stream === 4);
  const steam2025 = subscriptions.find((sub) => sub.stream === 2025);

  const isSteam4Base = steam4 && steam4.plan === 'Base';
  const isSteam4Pro = steam4 && steam4.plan === 'Pro';
  const isSteam2025Pro = steam2025 && steam2025.plan === 'Pro';

  // Always open
  pageContainersData.push({
    to: AppRoute.Begin,
    title: 'Введение',
    iconSrc: healthIconSrc,
    disabled: false,
    isHighlight: true,
  });

  if (isSteam4Pro) {
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
  } else if (isSteam2025Pro) {
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
  } else if (isSteam4Base) {
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
  }

  return pageContainersData;
};
