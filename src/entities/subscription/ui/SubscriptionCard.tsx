import styled from '@emotion/styled';
import { JSX } from 'react';

import checkIconSrc from '~/shared/assets/svg/check-2.svg';
import slashCircleIconSrc from '~/shared/assets/svg/slash-circle.svg';
import { Color } from '~/shared/theme/colors';

import { BaseSubscriptionCard } from './BaseSubscriptionCard';

type SubscriptionCardProps = {
  className?: string;
  status: 'active' | 'inactive';
};

const cardConfig = {
  active: {
    color: 'light',
    iconSrc: checkIconSrc,
    statusText: 'Активен',
    text: 'Завершится 25 июн, 2025',
  },
  inactive: {
    color: 'gray',
    iconSrc: slashCircleIconSrc,
    statusText: 'Неактивен',
    text: 'Подписка истекла 25 июн, 2025',
  },
} as const;

export function SubscriptionCard({
  className,
  status,
}: SubscriptionCardProps): JSX.Element {
  const { color, iconSrc, statusText, text } = cardConfig[status];

  return (
    <BaseSubscriptionCard className={className} color={color}>
      <StyledContent>
        <StyledHeader>
          <StyledTitle>Базовый тариф</StyledTitle>
          <StyledActiveStatus isActive={status === 'active'}>
            <img src={iconSrc} />
            {statusText}
          </StyledActiveStatus>
        </StyledHeader>
        <StyledFooter>
          <StyledStream>Поток 2</StyledStream>
          <StyledDate>{text}</StyledDate>
        </StyledFooter>
      </StyledContent>
    </BaseSubscriptionCard>
  );
}

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: auto;
`;

const StyledTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
`;

const StyledActiveStatus = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;

  padding: 6px 10px;
  border-radius: 20px;

  color: ${({ isActive }) => (isActive ? '#7A66FF' : '#8A8AAA')};
  font-size: 12px;
  font-weight: 600;

  background-color: ${({ isActive }) =>
    isActive ? `${Color.White}` : '#EAEAF0'};
`;

const StyledDate = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
`;

const StyledStream = styled.div`
  padding: 6px 12px;
  border: 1px solid ${Color.White};
  border-radius: 8px;

  font-size: 12px;
  font-weight: 600;
`;
