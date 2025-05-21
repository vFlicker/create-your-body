import './DashboardPage.css';

import { useEffect } from 'react';

import food from '~/shared/assets/nav/food.svg';
import book from '~/shared/assets/svg/book.svg';
// import Loader from '../../Components/Loader/Loader';
import health from '~/shared/assets/svg/health.svg';
import muscules from '~/shared/assets/svg/musclesBlack.svg';
import recipes from '~/shared/assets/svg/recipes.svg';
import { AppRoute } from '~/shared/router';
import { Label } from '~/shared/ui/label';
import { LabelLink } from '~/shared/ui/label/Label';

import Container from '../../Components/Container/Container';
// import Progress from '../../Components/Progress/Progress';
import History from '../../Components/History/History';
import ProfileBtn from '../../Components/ProfileBtn/ProfileBtn';

function SubscriptionStatus({ subscriptions }) {
  if (subscriptions.length === 1 && subscriptions[0].stream === 1) {
    return (
      <div className="dashLabels">
        <Label color="green">Поток 1</Label>
        <LabelLink
          color="violet"
          to="https://t.me/cybpayments_bot?start=startnewstream"
        >
          Перейти на 2 поток
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 6H10M10 6L7 3M10 6L7 9"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </LabelLink>
      </div>
    );
  }

  if (subscriptions.length === 1 && subscriptions[0].stream === 2) {
    return (
      <div className="dashLabels">
        <Label color="violet">
          Поток 2{' '}
          <svg
            className="spinnerSvg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1_8329)">
              <path
                d="M6 1.125V2.375M6 9V11M2.875 6H1.125M10.625 6H9.875M9.22855 9.22855L8.875 8.875M9.33211 2.70789L8.625 3.415M2.46079 9.53921L3.875 8.125M2.56434 2.60434L3.625 3.665"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_8329">
                <rect width="12" height="12" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Label>
      </div>
    );
  }

  return (
    <div className="dashLabels">
      <Label color="green">Поток 1</Label>
      <Label color="violet">
        Вы перешли на 2 поток{' '}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.2261 6.44641C10.0872 7.75136 9.34784 8.97422 8.12434 9.68061C6.0916 10.8542 3.49234 10.1577 2.31874 8.125L2.19374 7.90849M1.77259 5.55356C1.9115 4.24862 2.65089 3.02575 3.87438 2.31937C5.90713 1.14576 8.50639 1.84223 9.67999 3.87498L9.80499 4.09148M1.74609 9.03297L2.11212 7.66694L3.47814 8.03297M8.52062 3.96699L9.88665 4.33301L10.2527 2.96699M5.99938 3.74998V5.99998L7.24938 6.74998"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Label>
    </div>
  );
}

const getContainerData = (subscriptions) => {
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
    to: AppRoute.BEGIN,
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
        to: AppRoute.TRAINING,
      },
      {
        name: 'Питание',
        icon: food,
        closed: null,
        buy: false,
        instruction: false,
        to: AppRoute.FOOD,
      },
      {
        name: 'Лекции',
        icon: book,
        closed: null,
        buy: false,
        instruction: false,
        to: AppRoute.LECTURES,
      },
      {
        name: 'Рецепты',
        icon: recipes,
        closed: null,
        buy: false,
        instruction: false,
        to: AppRoute.RECIPES,
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
        to: AppRoute.TRAINING,
      },
      {
        name: 'Питание',
        icon: food,
        closed: null,
        buy: false,
        instruction: false,
        to: AppRoute.FOOD,
      },
      {
        name: 'Лекции',
        icon: book,
        closed: null,
        buy: false,
        instruction: false,
        to: AppRoute.LECTURES,
      },
      {
        name: 'Рецепты',
        icon: recipes,
        closed: null,
        buy: false,
        instruction: false,
        to: AppRoute.RECIPES,
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
        to: AppRoute.TRAINING,
      },
      {
        name: 'Питание',
        icon: food,
        closed: null,
        buy: false,
        instruction: false,
        to: AppRoute.FOOD,
      },
      {
        name: 'Лекции',
        icon: book,
        closed: '',
        buy: true,
        instruction: false,
        to: AppRoute.LECTURES,
      },
      {
        name: 'Рецепты',
        icon: recipes,
        closed: '',
        buy: true,
        instruction: false,
        to: AppRoute.RECIPES,
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
        to: AppRoute.TRAINING,
      },
      {
        name: 'Питание',
        icon: food,
        closed: null,
        buy: false,
        instruction: false,
        to: AppRoute.FOOD,
      },
      {
        name: 'Лекции',
        icon: book,
        closed: '',
        buy: true,
        instruction: false,
        to: AppRoute.LECTURES,
      },
      {
        name: 'Рецепты',
        icon: recipes,
        closed: '',
        buy: true,
        instruction: false,
        to: AppRoute.RECIPES,
      },
    );
  }

  return pageContainersData;
};

export function DashboardPage({ data }) {
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.setBackgroundColor('#F2F2F2');
    }
  }, []);

  const pageContainersData = getContainerData(data.subscriptions);

  const formatTimeFromString = (timeStr) => {
    if (!timeStr || typeof timeStr !== 'string') return '0:00';

    const [minutes, seconds] = timeStr.split(':').map(Number);
    if (isNaN(minutes) || isNaN(seconds)) return '0:00';

    const formattedMinutes = Math.floor(minutes);
    const formattedSeconds = Math.floor(seconds);
    return `${formattedMinutes}:${formattedSeconds < 10 ? '0' : ''}${formattedSeconds}`;
  };

  return (
    <div className="dashboard">
      <div className="dashTop">
        <div className="dashHeader">
          <ProfileBtn level={data.user_level} user_photo={data.image} />
          <SubscriptionStatus subscriptions={data.subscriptions} />
        </div>
        <div className="hello">
          <h1>Привет, {data?.name || 'Неизвестный'}!</h1>
          {/* <Progress count_all={0} count_complited={0} title='Прогресс тренировок' /> */}
        </div>
      </div>
      <div className="dashBot">
        {data.greet_video_time_view &&
          formatTimeFromString(data.greet_video_time_view) <
            formatTimeFromString('14:55') && (
            <div className="history">
              {/* {data?.last_video && (
            <History
              text="Продолжить просмотр"
              viewed={Math.floor((50 * 60 - Number(data.last_video_time)) / 60)} // Переводим оставшееся время в просмотренные минуты
              view={50} // Фиксированная длительность 50 минут
              lastVideo={data.last_video} // Передаём страницу для ссылки
            />
          )} */}

              <History
                text="Инструкция + Вводный урок"
                viewed={formatTimeFromString(data.greet_video_time_view)}
                view={formatTimeFromString('14:55')}
                instruction={true}
              />
            </div>
          )}
        <div className="dashMenu">
          {pageContainersData.map((container, index) => (
            <Container key={index} data={container} />
          ))}
        </div>
      </div>
    </div>
  );
}
