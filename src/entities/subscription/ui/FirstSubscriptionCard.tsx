import styled from '@emotion/styled';
import { JSX } from 'react';

import calendarIconSrc from '~/shared/assets/svg/calendar.svg';
import lightningIconSrc from '~/shared/assets/svg/lightning.svg';
import { Button } from '~/shared/ui/atoms/Button';

import { BaseSubscriptionCard } from './BaseSubscriptionCard';

type FirstSubscriptionCardProps = {
  className?: string;
};

export function FirstSubscriptionCard({
  className,
}: FirstSubscriptionCardProps): JSX.Element {
  return (
    <BaseSubscriptionCard className={className} color="normal">
      <StyledContent>
        <StyledTitle>Старт 2-го потока</StyledTitle>
        <StyledDate>
          <img src={calendarIconSrc} />
          25 июн, 2025
        </StyledDate>
        <StyledButton color="accent" iconSrc={lightningIconSrc}>
          Купить подписку
        </StyledButton>
      </StyledContent>
    </BaseSubscriptionCard>
  );
}

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const StyledTitle = styled.h2`
  margin-bottom: 12px;

  font-size: 18px;
  font-weight: 700;
`;

const StyledDate = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
`;

const StyledButton = styled(Button)`
  margin-top: auto;
`;
