import styled from '@emotion/styled';
import { JSX } from 'react';

type ResultCardProps = {
  title: string;
  indicator: string;
  description: string;
};

export function ResultCard({
  title,
  indicator,
  description,
}: ResultCardProps): JSX.Element {
  return (
    <StyledResultCardWrapper>
      <StyledTitle>{title}</StyledTitle>
      <StyledIndicator>{indicator}</StyledIndicator>
      <StyledDescription>{description}</StyledDescription>
    </StyledResultCardWrapper>
  );
}

const StyledResultCardWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 18px 14px;
  border-radius: 10px;

  color: #ffffff;

  background-image: linear-gradient(108deg, #7a66ff 24.52%, #8877fc 74.93%);
`;

const StyledTitle = styled.div`
  margin-bottom: 10px;

  font-size: 11px;
  font-weight: 600;
  line-height: 130%;
`;

const StyledIndicator = styled.div`
  margin-bottom: 14px;

  font-size: 22px;
  font-weight: 700;
  line-height: 130%;
  letter-spacing: -0.11px;
`;

const StyledDescription = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 140%;
`;
