import food from '~/shared/assets/nav/food.svg';
import book from '~/shared/assets/svg/book.svg';
import health from '~/shared/assets/svg/health.svg';
import muscules from '~/shared/assets/svg/musclesBlack.svg';
import recipes from '~/shared/assets/svg/recipes.svg';
import { AppRoute } from '~/shared/router';

type CardData = {
  name: string;
  icon: string;
  closed: string | null;
  buy: boolean;
  to: AppRoute;
  highlighted: boolean;
};

export const getTitleCards = (subscriptions) => {
  const pageContainersData: CardData[] = [];

  const firstSteam = subscriptions.find((sub) => sub.stream === 1);
  const secondSteam = subscriptions.find((sub) => sub.stream === 2);

  const firstSteamIsPro = firstSteam && firstSteam.plan === 'Pro';
  const secondSteamIsPro = secondSteam && secondSteam.plan === 'Pro';
  const firstSteamBase = firstSteam && firstSteam.plan === 'Base';
  const secondSteamBase = secondSteam && secondSteam.plan === 'Base';

  // Введение всегда открыто
  pageContainersData.push({
    name: 'Введение',
    icon: health,
    closed: null,
    buy: false,
    to: AppRoute.Begin,
    highlighted: true,
  });

  if (firstSteamIsPro) {
    // all open
    pageContainersData.push(
      {
        name: 'Тренировки',
        icon: muscules,
        closed: null,
        buy: false,
        to: AppRoute.Training,
        highlighted: false,
      },
      {
        name: 'Питание',
        icon: food,
        closed: null,
        buy: false,
        to: AppRoute.Food,
        highlighted: false,
      },
      {
        name: 'Лекции',
        icon: book,
        closed: null,
        buy: false,
        to: AppRoute.Lectures,
        highlighted: false,
      },
      {
        name: 'Рецепты',
        icon: recipes,
        closed: null,
        buy: false,
        to: AppRoute.Recipes,
        highlighted: false,
      },
    );
  } else if (secondSteamIsPro) {
    // all open
    pageContainersData.push(
      {
        name: 'Тренировки',
        icon: muscules,
        closed: null,
        buy: false,
        to: AppRoute.Training,
        highlighted: false,
      },
      {
        name: 'Питание',
        icon: food,
        closed: null,
        buy: false,
        to: AppRoute.Food,
        highlighted: false,
      },
      {
        name: 'Лекции',
        icon: book,
        closed: null,
        buy: false,
        to: AppRoute.Lectures,
        highlighted: false,
      },
      {
        name: 'Рецепты',
        icon: recipes,
        closed: null,
        buy: false,
        to: AppRoute.Recipes,
        highlighted: false,
      },
    );
  } else if (firstSteamBase) {
    // lectures and recipes -- buy, else open
    pageContainersData.push(
      {
        name: 'Тренировки',
        icon: muscules,
        closed: null,
        buy: false,
        to: AppRoute.Training,
        highlighted: false,
      },
      {
        name: 'Питание',
        icon: food,
        closed: null,
        buy: false,
        to: AppRoute.Food,
        highlighted: false,
      },
      {
        name: 'Лекции',
        icon: book,
        closed: '',
        buy: true,
        to: AppRoute.Lectures,
        highlighted: false,
      },
      {
        name: 'Рецепты',
        icon: recipes,
        closed: '',
        buy: true,
        to: AppRoute.Recipes,
        highlighted: false,
      },
    );
  } else if (secondSteamBase) {
    // lectures and recipes -- buy, else open
    pageContainersData.push(
      {
        name: 'Тренировки',
        icon: muscules,
        closed: null,
        buy: false,
        to: AppRoute.Training,
        highlighted: false,
      },
      {
        name: 'Питание',
        icon: food,
        closed: null,
        buy: false,
        to: AppRoute.Food,
        highlighted: false,
      },
      {
        name: 'Лекции',
        icon: book,
        closed: '',
        buy: true,
        to: AppRoute.Lectures,
        highlighted: false,
      },
      {
        name: 'Рецепты',
        icon: recipes,
        closed: '',
        buy: true,
        to: AppRoute.Recipes,
        highlighted: false,
      },
    );
  }

  return pageContainersData;
};
