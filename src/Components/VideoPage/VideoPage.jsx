import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './VideoPage.css';

import VideoViewer from '../VideoViewer/VideoViewer';
import Button from '../Button/Button';

import check from '../../Assets/svg/check.svg';

export default function VideoPage({ video, page, userId, instruction }) {
  const navigate = useNavigate();
  const [isVideoEnded, setIsVideoEnded] = useState(false); // Состояние завершения видео
  const togglePlayRef = useRef(null); // Реф для вызова togglePlay из VideoViewer

  // Обработчик клика по кнопке
  const handleButtonClick = () => {
    if (isVideoEnded) {
      // Если видео завершено, перенаправляем на /dashboard
      navigate('/dashboard');
    } else {
      // Если видео не завершено, воспроизводим его дальше
      if (togglePlayRef.current) {
        togglePlayRef.current(); // Вызываем togglePlay для продолжения воспроизведения
      }
    }
  };

  return (
    <div className="videoPage">
      <div className="videoInfo">
        <VideoViewer
          videoSrc={video}
          page={page}
          userId={userId}
          instruction={instruction}
          lastVideo={page}
          onVideoEnd={setIsVideoEnded} // Обновляем состояние, когда видео заканчивается
          togglePlayRef={togglePlayRef} // Передаем реф для управления воспроизведением
        />
        <p className="beginDescription">В этом видео я расскажу как подготовиться к старту программы</p>
      </div>
      <Button
        onClick={handleButtonClick}
        width="100%"
        color="#0D0D0D"
        icon={check}
        text={isVideoEnded ? 'Завершить' : 'Начать'} // Текст кнопки зависит от состояния
        bg="#CBFF52"
        bgFocus="#EBFFBD"
      />
    </div>
  );
}