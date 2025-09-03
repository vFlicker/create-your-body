import styled from '@emotion/styled';
import { JSX } from 'react';

import { BmiRiskLevel } from '../../model/bmiRiskLevel';
import { riskLevelGradient } from './statCardConfig';

type ShortStatCardProps = {
  className?: string;
  title: string;
  valueEmoji: string;
  description: string;
  riskLevel: BmiRiskLevel;
};

export function ShortStatCard({
  className,
  description,
  riskLevel,
  title,
  valueEmoji,
}: ShortStatCardProps): JSX.Element {
  return (
    <StyledShortStatCardWrapper className={className} riskLevel={riskLevel}>
      <StyledContent>
        <StyledTitle>
          {valueEmoji} {title}
        </StyledTitle>
        <StyledDescription>{description}</StyledDescription>
      </StyledContent>
    </StyledShortStatCardWrapper>
  );
}

const StyledShortStatCardWrapper = styled.div<{ riskLevel: BmiRiskLevel }>`
  display: flex;
  flex-direction: column;
  gap: 24px;

  padding: 18px 14px;
  border-radius: 10px;

  color: #ffffff;

  background-image: ${({ riskLevel }) => riskLevelGradient[riskLevel]};
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledTitle = styled.h3`
  font-size: 13px;
  font-weight: 700;
  line-height: 130%;
`;

const StyledDescription = styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 140%;
`;
