import styled from '@emotion/styled';
import { JSX } from 'react';

import slashCircleIconSrc from '~/shared/assets/svg/slash-circle.svg';

type PurchaseCardProps = {
  className?: string;
};

export function PurchaseCard({ className }: PurchaseCardProps): JSX.Element {
  return (
    <StyledPurchaseCardWrapper className={className}>
      <StyledHeader>
        <StyledTitle>Базовый тариф</StyledTitle>
        <StyledActiveStatus>
          <img src={slashCircleIconSrc} />
          Неактивен
        </StyledActiveStatus>
      </StyledHeader>
      <StyledFooter>
        <StyledStream>Поток 1</StyledStream>
        <StyledDate>1 янв — 1 фев 2025</StyledDate>
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

const StyledTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
`;

const StyledActiveStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  padding: 6px 10px;
  border-radius: 20px;

  font-size: 12px;
  font-weight: 600;

  background-color: #eaeaf0;
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
  border: 1px solid #817e95;
  border-radius: 8px;

  font-size: 12px;
  font-weight: 600;
`;
