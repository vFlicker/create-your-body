import './DashboardPage.css';

import { useNavigate } from 'react-router-dom';

import { StreamsInfo, UserMeta, useUser } from '~/entities/user';
import { TitleCard } from '~/shared/ui/TitleCard';

import History from '../../Components/VideoPage/History';
import { formatTimeFromString } from './formatTimeFromString';
import { getTitleCards } from './getContainerData';

export function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useUser();

  const pageContainersData = getTitleCards(user.subscriptions);

  return (
    <div className="dashboard">
      <div className="dashTop">
        <div className="dashHeader">
          <UserMeta />
          <StreamsInfo subscriptions={user.subscriptions} />
        </div>
        <div className="hello">
          <h1>Привет, {user?.name || 'Неизвестный'}!</h1>
        </div>
      </div>
      <div className="dashBot">
        {user.greet_video_time_view &&
          formatTimeFromString(user.greet_video_time_view) <
            formatTimeFromString('14:55') && (
            <div className="history">
              <History
                text="Инструкция + Вводный урок"
                viewed={formatTimeFromString(user.greet_video_time_view)}
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
