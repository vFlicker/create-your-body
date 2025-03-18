import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';
import { API_BASE_URL } from '../../API';

import ProfileBtn from '../../Components/ProfileBtn/ProfileBtn';
import Progress from '../../Components/Progress/Progress';
import History from '../../Components/History/History';
import Container from '../../Components/Container/Container';

import health from '../../Assets/svg/health.svg';
import muscules from '../../Assets/svg/musclesBlack.svg';
import food from '../../Assets/nav/food.svg';
import book from '../../Assets/svg/book.svg';
import recipes from '../../Assets/svg/recipes.svg';

export default function Dashboard({ userId }) {
  const [data, setData] = useState(null);

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

    const fetchdata = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/user`, {
          params: { user_id: userId },
        });
        setData(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error.message);
      }
    };

    fetchdata();
  }, [userId]);

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
          {data.last_video && (
            <History
              text="Продолжить просмотр"
              viewed={Math.floor((50 * 60 - Number(data.last_video_time)) / 60)} // Переводим оставшееся время в просмотренные минуты
              view={50} // Фиксированная длительность 50 минут
              lastVideo={data.last_video} // Передаём страницу для ссылки
            />
          )}
          <History text='Инструкция + Вводный урок' instruction={true} />
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