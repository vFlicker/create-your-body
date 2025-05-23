import food from '~/shared/assets/nav/food.svg';
import book from '~/shared/assets/svg/book.svg';
import health from '~/shared/assets/svg/health.svg';
import muscules from '~/shared/assets/svg/musclesBlack.svg';
import recipes from '~/shared/assets/svg/recipes.svg';
import { AppRoute } from '~/shared/router';

export const getTitleCards = (subscriptions) => {
  const pageContainersData = [];

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
    instruction: true,
    to: AppRoute.Begin,
  });

  if (firstSteamIsPro) {
    // all open
    pageContainersData.push(
      {
        name: 'Тренировки',
        icon: muscules,
        closed: null,
        buy: false,
        instruction: false,
        to: AppRoute.Traning,
      },
      {
        name: 'Питание',
        icon: food,
        closed: null,
        buy: false,
        instruction: false,
        to: AppRoute.Food,
      },
      {
        name: 'Лекции',
        icon: book,
        closed: null,
        buy: false,
        instruction: false,
        to: AppRoute.Lectures,
      },
      {
        name: 'Рецепты',
        icon: recipes,
        closed: null,
        buy: false,
        instruction: false,
        to: AppRoute.Recipes,
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
        instruction: false,
        to: AppRoute.Traning,
      },
      {
        name: 'Питание',
        icon: food,
        closed: null,
        buy: false,
        instruction: false,
        to: AppRoute.Food,
      },
      {
        name: 'Лекции',
        icon: book,
        closed: null,
        buy: false,
        instruction: false,
        to: AppRoute.Lectures,
      },
      {
        name: 'Рецепты',
        icon: recipes,
        closed: null,
        buy: false,
        instruction: false,
        to: AppRoute.Recipes,
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
        instruction: false,
        to: AppRoute.Traning,
      },
      {
        name: 'Питание',
        icon: food,
        closed: null,
        buy: false,
        instruction: false,
        to: AppRoute.Food,
      },
      {
        name: 'Лекции',
        icon: book,
        closed: '',
        buy: true,
        instruction: false,
        to: AppRoute.Lectures,
      },
      {
        name: 'Рецепты',
        icon: recipes,
        closed: '',
        buy: true,
        instruction: false,
        to: AppRoute.Recipes,
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
        instruction: false,
        to: AppRoute.Traning,
      },
      {
        name: 'Питание',
        icon: food,
        closed: null,
        buy: false,
        instruction: false,
        to: AppRoute.Food,
      },
      {
        name: 'Лекции',
        icon: book,
        closed: '',
        buy: true,
        instruction: false,
        to: AppRoute.Lectures,
      },
      {
        name: 'Рецепты',
        icon: recipes,
        closed: '',
        buy: true,
        instruction: false,
        to: AppRoute.Recipes,
      },
    );
  }

  return pageContainersData;
};
