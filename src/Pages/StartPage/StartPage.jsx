import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StartPage.css';

import Button from '../../Components/Button/Button';
import ImageOverlay from '../../Components/ImageOverley';

import startPhoto from '../../Assets/img/start.jpg';
import element from '../../Assets/img/element.png'
import run from '../../Assets/svg/run.svg';

export default function StartPage({ data }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.setBackgroundColor('#fff')
    }
  }, []);

  function handleButtonClick() {
    if (data.born_date) {
      navigate('/dashboard')
    } else {
      navigate('/quiz')
    }
  }

  return (
    <div className="startPage">
      <div className="imgContainer">
        <img className='green' src={element} alt="Зеленый фон" />
        <ImageOverlay
          overlayImageSrc={startPhoto}
          maskImageSrc={element}
        />
      </div>
      <div className="startDown">
        <div className="startPadding">
          <div className="startText">
            <h1>
              CREATE<br />YOUR <span>BODY</span>
            </h1>
            <p>Построй тело своей мечты</p>
          </div>
          <Button
            onClick={handleButtonClick}
            bgFocus="#A799FF"
            icon={run}
            text={data.born_date ? 'Тренироваться' : 'Начать'}
          />
        </div>
      </div>
    </div>
  );
}