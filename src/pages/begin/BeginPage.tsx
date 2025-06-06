import './BeginPage.css';

import { JSX, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Profile, useUser } from '~/entities/user';
import pdfSrc from '~/shared/assets/pdf/begin.pdf';
import health from '~/shared/assets/svg/health.svg';
import begin from '~/shared/assets/video/begin.mp4';
import { PdfViewer } from '~/shared/ui/pdfViewer';
import { Toggler } from '~/shared/ui/Toggler';

import VideoPage from '../../Components/VideoPage/VideoPage';

export function BeginPage(): JSX.Element {
  const location = useLocation();

  const { user } = useUser();

  // Парсим query-параметр view
  const queryParams = new URLSearchParams(location.search);
  const viewParam = queryParams.get('view');

  // Устанавливаем начальное значение videoView на основе query-параметра
  const [activeToggler, setActiveToggler] = useState(
    viewParam === 'video' ? 'Видео' : 'Подготовка',
  );

  const isVideoView = activeToggler === 'Видео';

  return (
    <div className="beginPage">
      <div className="topBegin">
        <Profile level={user.user_level} photoSrc={user.image} />
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
          <VideoPage video={begin} page="/begin" instruction={true} />
        )}

        {!isVideoView && <PdfViewer pdfSrc={pdfSrc} />}
      </div>
    </div>
  );
}
