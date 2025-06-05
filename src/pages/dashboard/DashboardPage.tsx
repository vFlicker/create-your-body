import './DashboardPage.css';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Profile, StreamsInfo } from '~/entities/user';
import { TitleCard } from '~/shared/ui/TitleCard';

import History from '../../Components/VideoPage/History';
import { formatTimeFromString } from './formatTimeFromString';
import { getTitleCards } from './getContainerData';

export function DashboardPage({ data }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.setBackgroundColor('#F2F2F2');
    }
  }, []);

  const pageContainersData = getTitleCards(data.subscriptions);

  return (
    <div className="dashboard">
      <div className="dashTop">
        <div className="dashHeader">
          <Profile level={data.user_level} photoSrc={data.image} />
          <StreamsInfo subscriptions={data.subscriptions} />
        </div>
        <div className="hello">
          <h1>Привет, {data?.name || 'Неизвестный'}!</h1>
        </div>
      </div>
      <div className="dashBot">
        {data.greet_video_time_view &&
          formatTimeFromString(data.greet_video_time_view) <
            formatTimeFromString('14:55') && (
            <div className="history">
              <History
                text="Инструкция + Вводный урок"
                viewed={formatTimeFromString(data.greet_video_time_view)}
                view={formatTimeFromString('14:55')}
                instruction={true}
              />
            </div>
          )}
        <div className="dashMenu">
          {pageContainersData.map(
            ({ name, icon, closed, buy, to, highlighted }) => (
              <TitleCard
                key={name}
                title={name}
                labelText={buy && 'Доступно в PRO'}
                labelIconSrc={buy && icon}
                iconSrc={icon}
                disabled={closed !== null || buy}
                highlighted={highlighted}
                onClick={() => navigate(to)}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
