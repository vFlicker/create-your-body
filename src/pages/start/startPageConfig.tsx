import { NavigateFunction } from 'react-router-dom';

import musclesIconSrc from '~/shared/assets/svg/muscles.svg';
import startIconSrc from '~/shared/assets/svg/run.svg';
import { AppRoute } from '~/shared/router';

export const buttonConfig = {
  start: {
    buttonText: 'Начать',
    buttonIconSrc: startIconSrc,
    onButtonClick: (navigate: NavigateFunction): void => {
      navigate(AppRoute.Quiz);
    },
  },
  training: {
    buttonText: 'К тренировкам',
    buttonIconSrc: musclesIconSrc,
    onButtonClick: (navigate: NavigateFunction): void => {
      navigate(AppRoute.Dashboard);
    },
  },
};
