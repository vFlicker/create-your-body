import React, { useState, useEffect } from 'react';
import './Begin.css';
import { useLocation } from 'react-router-dom'; // Импортируем useLocation

import ProfileBtn from '../../Components/ProfileBtn/ProfileBtn';
import Selecter from '../../Components/Selecter/Selecter';
import PDFViewer from '../../Components/PDFViewer/PDFViewer';
import VideoPage from '../../Components/VideoPage/VideoPage';

import health from '../../Assets/svg/health.svg';
import begin from '../../Assets/video/begin.mp4';

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

  // Автоматический импорт всех изображений begin*
  const importAll = (context) => context.keys().map(context);
  const pdfList = importAll(
    require.context('../../Assets/pdf/begin/', false, /begin_pdf_\d+\.(jpe?g)$/)
  );

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
          <h1>Введение</h1>
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
          <PDFViewer pdf_list={pdfList} />
        ) : (
          <VideoPage video={begin} page="/begin" userId={userId} instruction={true} />
        )}
      </div>
    </div>
  );
}