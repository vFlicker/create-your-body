import { JSX } from 'react';

import CheckIcon from '~/shared/assets/svg/check-2.svg?react';
import SandTimeIcon from '~/shared/assets/svg/sand-timer.svg?react';
import SlashCircleIcon from '~/shared/assets/svg/slash-circle.svg?react';

import { Subscription } from './subscriptionTypes';

type SubscriptionLabelConfig = {
  [key in Subscription['status']]: {
    statusText: string;
    iconComponent: JSX.Element;
  };
};

export const subscriptionLabelConfig: SubscriptionLabelConfig = {
  active: {
    statusText: 'Активна',
    iconComponent: <CheckIcon stroke="#ffffff" />,
  },
  expired: {
    statusText: 'Закончилась',
    iconComponent: <SlashCircleIcon stroke="#8A8AAA" />,
  },
  cancelled: {
    statusText: 'Отменена',
    iconComponent: <SlashCircleIcon stroke="#8A8AAA" />,
  },
  pre: {
    statusText: 'Не началась',
    iconComponent: <SandTimeIcon stroke="#8A8AAA" />,
  },
};

export const planLabels = {
  Base: 'Базовый тариф',
  Pro: 'Pro тариф',
};
