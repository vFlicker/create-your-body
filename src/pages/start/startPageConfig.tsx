import { NavigateFunction } from 'react-router-dom';

import { AppRoute } from '~/shared/router';
import { Icon } from '~/shared/ui/Icon';

export const buttonConfig = {
  start: {
    buttonText: 'Начать',
    ButtonIcon: <Icon name="icon-run" />,
    onButtonClick: (navigate: NavigateFunction): void => {
      navigate(AppRoute.Quiz);
    },
  },
  training: {
    buttonText: 'К тренировкам',
    ButtonIcon: <Icon name="icon-muscles" />,
    onButtonClick: (navigate: NavigateFunction): void => {
      navigate(AppRoute.Dashboard);
    },
  },
};
