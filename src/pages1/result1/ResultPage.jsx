import './ResultPage.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiService } from '~/shared/api';
import result from '~/shared/assets/img/result.jpg';
import muscles from '~/shared/assets/svg/musclesBlack.svg';
import settings from '~/shared/assets/svg/settings.svg';

import Button from '../../Components/Button/Button';

export function ResultPage({ userQuery }) {
  const navigate = useNavigate();
  const [level, setLevel] = useState('pro');

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const user = await apiService.getUserByQuery(userQuery);
        setLevel(user.user_level);
      } catch (error) {
        console.log(`Ошибка ${error}`);
      }
    };
    fetchLevel();
  }, [userQuery]);

  const description = {
    Профи:
      'У вас уверенный уровень подготовки,и вы готовы к интенсивным тренировкам. Наши программы помогут вам развить силу, выносливость и достичь новых спортивных целей!',
    Новичок:
      'Вы только начинаете свой путь в фитнесе. Мы подготовили для вас программы с упором на технику, постепенную адаптацию и безопасное повышение нагрузки.',
  };
  return (
    <div className="resultPage">
      <div className="resultImgContainer">
        <img src={result} alt="Результат опроса" />
      </div>
      <div className="resultInfo">
        <div className="resultText">
          <div className="levelContainer">
            <h1>Ваш уровень: {level}</h1>
            <p>{description[level]}</p>
          </div>
          <div className="clue">
            <img src={settings} alt="Настройки" />
            <p>Вы всегда можете изменить уровень в своем профиле</p>
          </div>
        </div>
        <Button
          icon={muscles}
          text="К тренировкам"
          bg="#CBFF52"
          bgFocus="#EBFFBD"
          color="#0D0D0D"
          onClick={() => navigate('/dashboard')}
        />
      </div>
    </div>
  );
}
