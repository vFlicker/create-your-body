import styled from '@emotion/styled';
import { JSX } from 'react';

import { planLabels, subscriptionLabelConfig } from '../subscriptionConfig';
import { formatSubscriptionDateRange } from '../subscriptionLib';
import { Subscription } from '../subscriptionTypes';

type PurchaseCardProps = {
  className?: string;
} & Subscription;

export function PurchaseCard({
  className,
  startedAt,
  expiresAt,
  plan,
  status,
  stream,
}: PurchaseCardProps): JSX.Element {
  const { statusText, iconComponent } = subscriptionLabelConfig[status];

  return (
    <StyledPurchaseCardWrapper className={className}>
      <StyledHeader>
        <StyledTitle statusType={status}>{planLabels[plan]}</StyledTitle>
        <StyledActiveStatus statusType={status}>
          {iconComponent}
          {statusText}
        </StyledActiveStatus>
      </StyledHeader>
      <StyledFooter>
        <StyledStream statusType={status}>Поток {stream}</StyledStream>
        <StyledDate>
          {formatSubscriptionDateRange(startedAt, expiresAt)}
        </StyledDate>
      </StyledFooter>
    </StyledPurchaseCardWrapper>
  );
}

const StyledPurchaseCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;
  padding: 18px 16px;
  border: 1px solid #e5e4ec;
  border-radius: 10px;

  color: #817e95;

  background-color: #f8f8f9;
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
`;

const StyledTitle = styled.h2<{ statusType: Subscription['status'] }>`
  color: ${({ statusType }) =>
    statusType === 'active' ? '#373737' : '#8A8AAA'};
  font-size: 18px;
  font-weight: 700;
`;

const StyledActiveStatus = styled.div<{ statusType: Subscription['status'] }>`
  display: flex;
  align-items: center;
  gap: 4px;

  padding: 6px 10px;
  border-radius: 20px;

  color: ${({ statusType }) =>
    statusType === 'active' ? '#FFFFFF' : '#8A8AAA'};
  font-size: 12px;
  font-weight: 600;

  background-color: ${({ statusType }) =>
    statusType === 'active' ? '#00C964' : '#eaeaf0'};
`;

const StyledDate = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;

  font-size: 12px;
  font-weight: 600;
`;

const StyledStream = styled.div<{ statusType: Subscription['status'] }>`
  padding: 6px 12px;
  border-style: solid;
  border-width: 1px;
  border-color: ${({ statusType }) =>
    statusType === 'active' ? '#7A66FF' : '#817e95'};
  border-radius: 8px;

  color: ${({ statusType }) =>
    statusType === 'active' ? '#7A66FF' : '#817e95'};
  font-size: 12px;
  font-weight: 600;
`;
