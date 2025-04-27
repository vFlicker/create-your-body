import './History.css';

import { useNavigate } from 'react-router-dom';

import play from '~/shared/assets/svg/play.svg';

export default function History({
  text,
  viewed = 10,
  view = '50',
  instruction = false,
  lastVideo,
}) {
  const navigate = useNavigate();

  // Функция для преобразования времени из формата MM:SS в секунды (number)
  const parseTimeToSeconds = (time) => {
    // Если time уже число, возвращаем его
    if (typeof time === 'number') return time;

    // Если time - строка в формате MM:SS
    if (typeof time === 'string') {
      const [minutes, seconds] = time.split(':').map(Number);
      if (isNaN(minutes) || isNaN(seconds)) return 0; // Если не удалось распарсить, возвращаем 0
      return minutes * 60 + seconds; // Преобразуем в секунды
    }

    return 0; // Если формат неизвестен, возвращаем 0
  };

  // Преобразуем viewed и view в секунды
  const viewedInSeconds = parseTimeToSeconds(viewed);
  const viewInSeconds = parseTimeToSeconds(view);

  // Вычисляем оставшееся время в минутах
  const remainingMinutes = Math.floor((viewInSeconds - viewedInSeconds) / 60);

  const handleClick = () => {
    if (instruction) {
      navigate('/begin?view=video');
    } else if (lastVideo) {
      navigate(`/${lastVideo}`);
    }
  };

  return (
    <div
      className="historyContainer"
      style={{
        background: instruction ? '#FAFAFA' : '',
        border: instruction ? '1px solid #e6e6e6' : '',
      }}
      onClick={handleClick}
    >
      <div className="historyInfo">
        <p>Продолжить</p>
        <progress
          className={`historyProgress ${instruction ? 'instruction' : ''}`}
          value={viewedInSeconds} // Теперь это число в секундах
          max={viewInSeconds} // Теперь это число в секундах
        />
        <span>{text}</span>
      </div>
      <div
        className="historyActionDashboard"
        style={{ background: instruction ? '#E4E1FB' : '' }}
      >
        <p>{remainingMinutes} мин</p>
        <button
          className="historyPlay"
          style={{ background: instruction ? '#A799FF' : '' }}
        >
          <img src={play} alt="Продолжить просмотр" />
        </button>
      </div>
    </div>
  );
}
