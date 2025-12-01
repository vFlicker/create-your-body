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

export const getTitleCards = (
  subscriptions: Subscription[],
  selectedStream: number | null,
) => {
  const pageContainersData: CardData[] = [];

  pageContainersData.push({
    to: AppRoute.Begin,
    title: 'Введение',
    iconSrc: healthIconSrc,
    disabled: false,
    isHighlight: true,
  });

  const subscription = subscriptions.find(
    ({ stream }) => stream === selectedStream,
  );
  if (!subscription) return pageContainersData;

  if (subscription.plan === 'Pro') {
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
  }

  if (subscription.plan === 'Base') {
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
