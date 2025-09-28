import styled from '@emotion/styled';
import { JSX } from 'react';

import { riskLevelGradient } from '../lib/riskLevelGradient';
import { BmiRiskLevel } from '../statCardTypes';

type StatCardProps = {
  className?: string;
  title: string;
  valueEmoji: string;
  value: number;
  description: string;
  calories: number;
  percentage: number;
  riskLevel: BmiRiskLevel;
};

export function StatCard({
  className,
  calories,
  description,
  percentage,
  riskLevel,
  title,
  valueEmoji,
  value,
}: StatCardProps): JSX.Element {
  return (
    <StyledStatCardWrapper className={className} riskLevel={riskLevel}>
      <StyledContent>
        <StyledTitle>{title}</StyledTitle>
        <StyledValue>
          {valueEmoji} {value} г
        </StyledValue>
        <StyledDescription>{description}</StyledDescription>
      </StyledContent>

      <StyledList>
        <StyledItem>🔥 {calories} ккал</StyledItem>
        <StyledItem>📊 {percentage}% от рациона</StyledItem>
      </StyledList>
    </StyledStatCardWrapper>
  );
}

const StyledStatCardWrapper = styled.div<{ riskLevel: BmiRiskLevel }>`
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
  font-size: 11px;
  font-weight: 600;
  line-height: 130%;
`;

const StyledValue = styled.span`
  font-size: 22px;
  font-weight: 700;
  line-height: 130%;
  letter-spacing: -0.11px;
`;

const StyledDescription = styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 140%;
`;

const StyledList = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const StyledItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 5px 8px;
  border-radius: 50px;

  font-size: 12px;
  font-weight: 700;
  line-height: 14px;

  background-color: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(10px);
`;
