import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import axios from 'axios';
import { API_BASE_URL } from '../../API';

import PhotoEditor from '../../Components/PhotoEditor/PhotoEditor';
import ProfileBtn from '../../Components/ProfileBtn/ProfileBtn';
import Selecter from '../../Components/Selecter/Selecter';
import Button from '../../Components/Button/Button';
import ButtonEdit from '../../Components/Button/ButtonEdit';

import settings from '../../Assets/svg/settings.svg';
import right from '../../Assets/svg/right.svg';
import close from '../../Assets/svg/close.svg';
import zamer from '../../Assets/img/zamer.jpeg';
import chart from '../../Assets/svg/chart.svg';
import img from '../../Assets/img/result.jpg';

export default function Profile({ userId, data, setData }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(data.user_level === 'Новичок' ? 0 : 1);
  const [dataParameters, setDataParameters] = useState(null);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.setBackgroundColor('#F2F2F2');
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/user_parametrs`, {
          params: { user_tg_id: userId }, // Изменено с user_id на user_tg_id
        });
        const parameters = Array.isArray(response.data) ? response.data : [response.data];
        const latestParameters = parameters[parameters.length - 1];
        setDataParameters(latestParameters);
      } catch (err) {
        console.error('Ошибка при получении параметров:', err.response ? JSON.stringify(err.response.data, null, 2) : err.message);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleTouchStart = () => setIsPressed(true);
  const handleTouchEnd = () => setIsPressed(false);

  const handleSelecterClick = async (index) => {
    setActiveIndex(index);
    const level = index === 0 ? 'Новичок' : 'Профи';
    try {
      await axios.patch(`${API_BASE_URL}/api/v1/user/level`, null, {
        params: { user_tg_id: userId, level: level },
      });
      console.log('Уровень сложности успешно обновлён:', level);
      const response = await axios.get(`${API_BASE_URL}/api/v1/user`, {
        params: { user_id: userId },
      });
      setData(response.data);
    } catch (error) {
      console.error('Ошибка при обновлении уровня сложности:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    }
  };

  return (
    <div className="profilePage">
      <div className="profileContainer">
        {dataParameters ? (
          <div className="profile" style={{ justifyContent: 'space-between' }}>
            <div className="profileData">
              <ProfileBtn level={data?.user_level} user_photo={data?.image} />
              <div className="profileName">
                <p>{data?.name || 'Имя'}</p>
                <span>{data?.user_level || 'Уровень'}</span>
              </div>
            </div>
            <ButtonEdit onClick={() => navigate('/parameters')} />
          </div>
        ) : (
          <div className="profile">
            <ProfileBtn level={data?.user_level} user_photo={data?.image} />
            <div className="profileName">
              <p>{data?.name || 'Имя'}</p>
              <span>{data?.user_level || 'Уровень'}</span>
            </div>
          </div>
        )}
        <div className="settings">
          <div className="set" onClick={() => setOpen(!open)}>
            <img src={settings} alt="Настройки" />
            <p>Настроить уровень сложности</p>
            <img
              className="toggle"
              src={right}
              style={{ opacity: open ? '0' : '1' }}
              alt="Настроить уровень сложности"
            />
            <img
              className="toggle"
              src={close}
              style={{ opacity: open ? '1' : '0' }}
              alt="Настроить уровень сложности"
            />
          </div>
          {open && (
            <Selecter
              bg="#fff"
              activeIndex={activeIndex}
              textOne="Новичок"
              textTwo="Профи"
              onClick={handleSelecterClick}
            />
          )}
        </div>
        {dataParameters ? (
          <div className="dataHave">
            <div className="recordText">
              <h4>Запись прогресса</h4>
              <p>Чтобы отслеживать прогресс необходимо в конце каждой недели обновлять параметры.</p>
            </div>
            <button
              className="recordBtn"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onClick={() => navigate('/record')}
              style={{ background: isPressed ? '#C0C0C0' : '', borderColor: isPressed ? '#C0C0C0' : '' }}
            >
              <img src={chart} alt="Записать прогресс" />
              <p>Записать прогресс</p>
            </button>
            <div className="parameters">
              <h3>Параметры</h3>
              <div className="parametersValues">
                <div className="param">
                  <div className="value">
                    <span>Возраст</span>
                    <p>{data?.born_date ? new Date().getFullYear() - new Date(data.born_date).getFullYear() : '-'}</p>
                  </div>
                  <div className="value">
                    <span>Пол</span>
                    <p>{data?.sex || '-'}</p>
                  </div>
                </div>
                <div className="param">
                  <div className="value">
                    <span>Обхват груди</span>
                    <p>{dataParameters.chest || 0}</p>
                  </div>
                  <div className="value">
                    <span>Обхват талии</span>
                    <p>{dataParameters.waist || 0}</p>
                  </div>
                </div>
                <div className="param">
                  <div className="value">
                    <span>Обхват живота</span>
                    <p>{dataParameters.abdominal_circumference || 0}</p>
                  </div>
                  <div className="value">
                    <span>Обхват бедер</span>
                    <p>{dataParameters.hips || 0}</p>
                  </div>
                </div>
                <div className="param">
                  <div className="value">
                    <span>Обхват ноги</span>
                    <p>{dataParameters.legs || 0}</p>
                  </div>
                  <div className="value">
                    <span>Вес</span>
                    <p>{dataParameters.weight || 0}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="photosContainerBefore">
              <h3>Фотографии</h3>
              <p>До и после тренировочной недели</p>
              <div className="photosBefore">
                <PhotoEditor label="Фото до" initialPhoto={img} userId={userId} number={0} />
                <PhotoEditor label="Фото после" initialPhoto={img} userId={userId} number={1} />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="zamer">
              <img src={zamer} alt="Важность замеров" />
            </div>
            <div className="profileInfo">
              <h4>Почему важно сделать фото и замеры?</h4>
              <p>Полагаться только на весы нет смысла. (советую взвешиваться не чаще чем раз в неделю на программе).</p>
              <div style={{ padding: '8px 16px', background: '#CEC8FF', borderRadius: '14px' }}>
                <p>Вес может скакать изо дня в день, особенно если вы начинаете ходить в зал. Это нормально.</p>
              </div>
              <p>Также помним, что один и тот же вес будет смотреться на разных девушках по-разному! Все зависит от соотношения жира и мышц в организме.</p>
              <div style={{ padding: '8px 16px', background: '#E6FFAD', borderRadius: '14px' }}>
                <p>Поэтому ни с кем себя не сравниваем! Сравниваем только с собой из вчера!</p>
              </div>
            </div>
          </>
        )}
        {!dataParameters && (
          <Button
            onClick={() => navigate('/parameters')}
            text="Добавить параметры"
            bg="#A799FF"
            bgFocus="#776CBC"
            color="#F2F2F2"
          />
        )}
      </div>
    </div>
  );
}