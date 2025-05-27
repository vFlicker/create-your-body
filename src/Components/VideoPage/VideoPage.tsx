import './VideoPage.css';

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import checkIconSrc from '~/shared/assets/svg/check.svg';
import { Button } from '~/shared/ui/Button';

import VideoViewer from '../VideoViewer/VideoViewer';

export default function VideoPage({ video, page, userId, instruction, text }) {
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
        <p className="beginDescription">
          {instruction
            ? 'В этом видео я расскажу как подготовиться к старту программы'
            : text}
        </p>
      </div>
      <Button
        color="secondary"
        iconSrc={checkIconSrc}
        onClick={handleButtonClick}
      >
        {isVideoEnded ? 'Завершить' : 'Начать'}
      </Button>
    </div>
  );
}
