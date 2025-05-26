import './BeginPage.css';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Импортируем useLocation

import { Profile } from '~/entities/user';
import pdfSrc from '~/shared/assets/pdf/begin.pdf';
import health from '~/shared/assets/svg/health.svg';
import begin from '~/shared/assets/video/begin.mp4';
import { Toggler } from '~/shared/ui/Toggler';
import { PdfViewer } from '~/widget/pdfViewer/PdfViewer';

import VideoPage from '../../Components/VideoPage/VideoPage';

export function BeginPage({ userId, data }) {
  // Получаем query-параметры из URL
  const location = useLocation();

  // Парсим query-параметр view
  const queryParams = new URLSearchParams(location.search);
  const viewParam = queryParams.get('view');

  // Устанавливаем начальное значение videoView на основе query-параметра
  const [activeToggler, setActiveToggler] = useState(
    viewParam === 'video' ? 'Видео' : 'Подготовка',
  );

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.setBackgroundColor('#F2F2F2');
    }
  }, []);

  const isVideoView = activeToggler === 'Видео';

  return (
    <div className="beginPage">
      <div className="topBegin">
        <Profile level={data.user_level} photoSrc={data.image} />
        <div className="beginTitle">
          <img src={health} alt="Введение" />
          <h1 style={{ fontSize: '24px' }}>Введение</h1>
        </div>
      </div>
      <div className="botBegin">
        <Toggler
          values={['Подготовка', 'Видео']}
          activeValue={activeToggler}
          onClick={setActiveToggler}
        />

        {isVideoView && (
          <VideoPage
            video={begin}
            page="/begin"
            userId={userId}
            instruction={true}
          />
        )}

        {!isVideoView && <PdfViewer pdfFileSrc={pdfSrc} />}
      </div>
    </div>
  );
}
