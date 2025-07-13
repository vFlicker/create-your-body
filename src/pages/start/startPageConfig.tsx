import { NavigateFunction } from 'react-router-dom';

import MusclesIcon from '~/shared/assets/svg/muscles.svg?react';
import StartIcon from '~/shared/assets/svg/run.svg?react';
import { AppRoute } from '~/shared/router';

export const buttonConfig = {
  start: {
    buttonText: 'Начать',
    buttonIcon: <StartIcon stroke="#F2F2F2" />,
    onButtonClick: (navigate: NavigateFunction): void => {
      navigate(AppRoute.Quiz);
    },
  },
  training: {
    buttonText: 'К тренировкам',
    buttonIcon: <MusclesIcon stroke="#F2F2F2" />,
    onButtonClick: (navigate: NavigateFunction): void => {
      navigate(AppRoute.Dashboard);
    },
  },
};
