import './TrainPage.css';

import { useEffect, useState } from 'react';

// import Progress from '../../Components/Progress/Progress';
import muscules from '~/shared/assets/svg/musclesBlack.svg';
import back from '~/shared/assets/train/back.svg';
import dumbbells from '~/shared/assets/train/dumbbells.svg';
import question from '~/shared/assets/train/question.svg';
import sport from '~/shared/assets/train/sport.svg';
import { Select } from '~/shared/ui/Select';

import TrainContainer from '../../Components/Container/TrainContainer';
import ProfileBtn from '../../Components/ProfileBtn/ProfileBtn';
import TrainContent from '../../Components/TrainContent/TrainContent';

const pageContainersData = [
  {
    title: 'Разминка / МФР',
    icon: back,
    to: 'warmup',
  },
  {
    title: 'Все о тренировках',
    icon: question,
    to: 'train',
  },
  {
    title: 'Тренировка для дома',
    icon: sport,
    to: 'home',
  },
  {
    title: 'Тренировка для зала',
    icon: dumbbells,
    to: 'gym',
  },
];

export function TrainPage({ userQuery, data, level, base }) {
  const [showContent, setShowContent] = useState(false);
  const [selectedView, setSelectedView] = useState(null);

  const streamOptions = data.subscriptions.map(({ stream }) => ({
    value: stream,
    label: `Поток ${stream}`,
  }));

  const maxStreamSubscription = data.subscriptions.reduce((max, sub) => {
    return sub.stream > max.stream ? sub : max;
  });

  const [selectedStream, setSelectedStream] = useState(
    maxStreamSubscription.stream,
  );

  useEffect(() => {
    // Слушаем изменения window.showContent
    const handleShowContentChange = () => {
      setShowContent(window.showContent);
    };

    window.addEventListener('showContentChange', handleShowContentChange);
    return () => {
      window.removeEventListener('showContentChange', handleShowContentChange);
    };
  }, []);

  const handleContainerClick = (containerData) => {
    setSelectedView(containerData.to);
    setShowContent(true);
    window.showContent = true;
  };

  const onStreamChange = (evt) => {
    setSelectedStream(evt.target.value);
  };

  return (
    <div className="trainPage">
      <div className="topTrain">
        <ProfileBtn level={data?.user_level} user_photo={data.image} />
        <div className="trainTitleWrapper">
          <div className="trainTitle">
            <img src={muscules} alt="Тренировка" />
            <h1 style={{ fontSize: '24px' }}>Тренировки</h1>
          </div>
          <Select
            options={streamOptions}
            value={selectedStream}
            onChange={onStreamChange}
          />
        </div>
        {/* <Progress /> */}
      </div>
      <div className="botTrain">
        <div className={`content-wrapper ${showContent ? 'slide-left' : ''}`}>
          <div
            className="train-content"
            style={{ transform: showContent ? 'translateX(-50%)' : '' }}
          >
            {pageContainersData?.map((containerData, index) => (
              <TrainContainer
                key={index}
                title={containerData.title}
                icon={containerData.icon}
                iconAlt={containerData.title}
                onClick={() => handleContainerClick(containerData)}
              />
            ))}
          </div>
          {showContent && (
            <div
              className={`train-details-content ${showContent ? 'slide-in' : ''}`}
            >
              <TrainContent
                userQuery={userQuery}
                stream={selectedStream}
                view={selectedView}
                level={level}
                base={base}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
