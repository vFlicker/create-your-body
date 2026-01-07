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

  const steam5 = subscriptions.find((sub) => sub.stream === 5);

  const isSteam5Base = steam5?.plan === 'Base';
  const isSteam5Pro = steam5?.plan === 'Pro';

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
        labelText: isSteam5Pro ? 'Доступно с 24 января' : undefined,
        disabled: isSteam5Pro ? true : false,
        isHighlight: false,
      },
      {
        to: AppRoute.FoodCategories,
        title: 'Питание',
        iconSrc: foodIconSrc,
        labelText: isSteam5Pro ? 'Доступно с 24 января' : undefined,
        disabled: isSteam5Pro ? true : false,
        isHighlight: false,
      },
      {
        to: AppRoute.LectureWeeks,
        title: 'Лекции',
        iconSrc: bookIconSrc,
        labelText: isSteam5Pro ? 'Доступно с 24 января' : undefined,
        disabled: isSteam5Pro ? true : false,
        isHighlight: false,
      },
      {
        to: AppRoute.RecipeCategories,
        title: 'Рецепты',
        iconSrc: recipesIconSrc,
        labelText: isSteam5Pro ? 'Доступно с 24 января' : undefined,
        disabled: isSteam5Pro ? true : false,
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
        labelText: isSteam5Base ? 'Доступно с 24 января' : undefined,
        disabled: isSteam5Base ? true : false,
        isHighlight: false,
      },
      {
        to: AppRoute.FoodCategories,
        title: 'Питание',
        iconSrc: foodIconSrc,
        labelText: isSteam5Base ? 'Доступно с 24 января' : undefined,
        disabled: isSteam5Base ? true : false,
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
