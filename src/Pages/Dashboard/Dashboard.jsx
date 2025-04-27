import './Dashboard.css';

import { useEffect } from 'react';

import food from '~/shared/assets/nav/food.svg';
import book from '~/shared/assets/svg/book.svg';
// import Loader from '../../Components/Loader/Loader';
import health from '~/shared/assets/svg/health.svg';
import muscules from '~/shared/assets/svg/musclesBlack.svg';
import recipes from '~/shared/assets/svg/recipes.svg';

import Container from '../../Components/Container/Container';
// import Progress from '../../Components/Progress/Progress';
import History from '../../Components/History/History';
import ProfileBtn from '../../Components/ProfileBtn/ProfileBtn';

export default function Dashboard({ data, base }) {
  const pageContainersData = [
    {
      name: 'Введение',
      icon: health,
      closed: null,
      buy: false,
      instruction: true,
      to: 'begin',
    },
    {
      name: 'Тренировки',
      icon: muscules,
      closed: null,
      buy: false,
      instruction: false,
      to: 'train',
    },
    {
      name: 'Питание',
      icon: food,
      closed: null,
      buy: false,
      instruction: false,
      to: 'food',
    },
    {
      name: 'Лекции',
      icon: book,
      closed: base ? '' : null,
      buy: base ? true : false,
      instruction: false,
      to: 'lectures',
    },
    {
      name: 'Рецепты',
      icon: recipes,
      closed: base ? '' : null,
      buy: base ? true : false,
      instruction: false,
      to: 'recipes',
    },
  ];

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.setBackgroundColor('#F2F2F2');
    }
  }, []);

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
        <ProfileBtn level={data.user_level} user_photo={data.image} />
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
