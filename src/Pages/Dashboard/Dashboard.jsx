import React, { useEffect } from 'react';
import './Dashboard.css';

import ProfileBtn from '../../Components/ProfileBtn/ProfileBtn';
import Progress from '../../Components/Progress/Progress';
import History from '../../Components/History/History';
import Container from '../../Components/Container/Container';
// import Loader from '../../Components/Loader/Loader';

import health from '../../Assets/svg/health.svg';
import muscules from '../../Assets/svg/musclesBlack.svg';
import food from '../../Assets/nav/food.svg';
import book from '../../Assets/svg/book.svg';
import recipes from '../../Assets/svg/recipes.svg';

export default function Dashboard({ data }) {

  const pageContainersData = [
    {
      name: 'Введение',
      icon: health,
      closed: null,
      buy: false,
      instruction: true,
      to: 'begin'
    },
    {
      name: 'Тренировки',
      icon: muscules,
      closed: '22 марта',
      buy: false,
      instruction: false,
      to: 'training'
    },
    {
      name: 'Питание',
      icon: food,
      closed: '22 марта',
      buy: false,
      instruction: false,
      to: 'food'
    },
    {
      name: 'Лекции',
      icon: book,
      closed: '22 марта',
      buy: false,
      instruction: false,
      to: 'lectures'
    },
    {
      name: 'Рецепты',
      icon: recipes,
      closed: null,
      buy: true,
      instruction: false,
      to: 'recipes'
    },
  ];

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.setBackgroundColor('#F2F2F2');
    }
  }, []);

  const parseTimeToSeconds = (timeStr) => {
    if (!timeStr || typeof timeStr !== 'string') return 0; // Проверка на валидность входных данных
  
    // Разделяем строку на минуты и секунды
    const [minutes, seconds] = timeStr.split(':').map(Number);
    
    // Проверяем, что значения корректны
    if (isNaN(minutes) || isNaN(seconds)) return 0;
  
    // Преобразуем в секунды: минуты * 60 + секунды
    return minutes * 60 + seconds;
  };

  return (
    <div className='dashboard'>
      <div className="dashTop">
        <ProfileBtn level={data.user_level} user_photo={data.image} />
        <div className="hello">
          <h1>Привет, {data?.name || 'Неизвестный'}!</h1>
          <Progress count_all={0} count_complited={0} title='Прогресс тренировок' />
        </div>
      </div>
      <div className="dashBot">
        <div className="history">
          {/* {data?.last_video && (
            <History
              text="Продолжить просмотр"
              viewed={Math.floor((50 * 60 - Number(data.last_video_time)) / 60)} // Переводим оставшееся время в просмотренные минуты
              view={50} // Фиксированная длительность 50 минут
              lastVideo={data.last_video} // Передаём страницу для ссылки
            />
          )} */}
          {data?.greet_video_time_view && 
          <History text='Инструкция + Вводный урок' viewed={parseTimeToSeconds(data.greet_video_time_view)} view={895} instruction={true} />
          }
        </div>
        <div className="dashMenu">
          {pageContainersData.map((container, index) => (
            <Container
              key={index}
              data={container}
            />
          ))}
        </div>
      </div>
    </div>
  );
}