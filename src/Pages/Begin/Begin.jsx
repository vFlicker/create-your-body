import './Begin.css';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Импортируем useLocation

import pdf from '~/shared/assets/pdf/begin.pdf';
import health from '~/shared/assets/svg/health.svg';
import begin from '~/shared/assets/video/begin.mp4';

import PdfViewer from '../../Components/PdfViewer/PdfViewer';
import ProfileBtn from '../../Components/ProfileBtn/ProfileBtn';
import Selecter from '../../Components/Selecter/Selecter';
import VideoPage from '../../Components/VideoPage/VideoPage';

export default function Begin({ userId, data }) {
  // Получаем query-параметры из URL
  const location = useLocation();

  // Парсим query-параметр view
  const queryParams = new URLSearchParams(location.search);
  const viewParam = queryParams.get('view');

  // Устанавливаем начальное значение videoView на основе query-параметра
  const [videoView, setVideoView] = useState(viewParam === 'video');
  const [activeIndex, setActiveIndex] = useState(viewParam === 'video' ? 1 : 0);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.setBackgroundColor('#F2F2F2');
    }
  }, []);

  const handleSelect = (index) => {
    setActiveIndex(index);
    setVideoView(index === 1);
  };

  return (
    <div className="beginPage">
      <div className="topBegin">
        <ProfileBtn level={data.user_level} user_photo={data.image} />
        <div className="beginTitle">
          <img src={health} alt="Введение" />
          <h1 style={{ fontSize: '24px' }}>Введение</h1>
        </div>
      </div>
      <div className="botBegin">
        <Selecter
          onClick={handleSelect}
          textOne="Подготовка"
          textTwo="Видео"
          activeIndex={activeIndex}
        />
        {!videoView ? (
          <PdfViewer pdfFile={pdf} />
        ) : (
          <VideoPage
            video={begin}
            page="/begin"
            userId={userId}
            instruction={true}
          />
        )}
      </div>
    </div>
  );
}
