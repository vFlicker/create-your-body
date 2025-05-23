import './TrainBox.css';

import { useEffect, useState } from 'react';

import mokap from '~/shared/assets/img/mokap.jpeg';
import close from '~/shared/assets/svg/closeTrain.svg';
import bonus from '~/shared/assets/svg/gift.svg';
import play from '~/shared/assets/svg/play.svg';

export default function TrainBox({
  data,
  lectures,
  onClick,
  level,
  steps,
  isClosed,
  isBonus,
  train_count,
}) {
  const [levelType, setLevelType] = useState(level);

  useEffect(() => {
    setLevelType(level === 'Новичок' ? 'newbie' : 'profi');
  }, [level]);

  // Определяем, какие данные использовать
  const isLecture = !!lectures;
  const currentData = isLecture ? lectures : data;

  // Получаем количество тренировок/упражнений
  const getCount = () => {
    if (isClosed && isLecture) {
      return 1;
    }
    if (currentData?.count !== undefined) {
      return currentData.count;
    }
    if (currentData?.week) {
      return currentData.trainings?.length || 0;
    }
    if (currentData?.title) {
      if (currentData.title.toLowerCase().includes('лекция')) {
        return 0;
      }
      // Определяем, какие данные использовать в зависимости от типа и уровня
      const trainingData = isLecture ? currentData : currentData[levelType];

      // Проверяем, является ли trainingData массивом или объектом
      if (Array.isArray(trainingData)) {
        return trainingData.length;
      } else if (trainingData && typeof trainingData === 'object') {
        return 1; // Если это объект, значит это одна тренировка
      }
      return 0;
    }
    return 0;
  };

  const getTitle = () => {
    if (currentData?.title) {
      return currentData.title;
    }
    if (currentData?.week) {
      return `Неделя ${currentData.week}`;
    }
    return 'Тренировка';
  };

  const getSubtitle = () => {
    if (currentData?.subtitle) {
      return currentData.subtitle;
    }
    if (currentData?.week) {
      if (lectures) {
        return `Лекций ${getCount()}`;
      } else if (steps) {
        return `Упражнений ${getCount()}`;
      } else return `Тренировок ${getCount()}`;
    }
    return '';
  };

  return (
    <div
      className={`trainBox ${isClosed ? 'closed' : ''}`}
      onClick={isClosed ? undefined : onClick}
    >
      {isClosed && <img src={close} alt="close" className="closeTrain" />}
      {isBonus && (
        <div className="bonus">
          <img src={bonus} alt="Бонус" />
        </div>
      )}
      <div className="forTrainImg">
        <img src={currentData?.coverUrl || mokap} alt="play" />
      </div>
      <div className="forTrainText">
        <div className="trainText">
          <h1>{getTitle()}</h1>
          {train_count !== 0 && <p>{getSubtitle()}</p>}
        </div>
        <button className="trainBtn">
          <img src={play} alt="arrow" />
        </button>
      </div>
    </div>
  );
}
