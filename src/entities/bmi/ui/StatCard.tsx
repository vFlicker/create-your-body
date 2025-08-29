import styled from '@emotion/styled';
import { JSX } from 'react';

import { BmiRiskLevel } from '../bmiConfig';

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

const riskLevelGradient = {
  [BmiRiskLevel.VeryLow]:
    'linear-gradient(108deg, #FF9D3C 6.67%, #FB8EA6 55.35%, #7A66FF 104.03%, #8877FC 201.4%)',
  [BmiRiskLevel.Low]:
    'linear-gradient(105deg, #FFAA3C -26.22%, #FB8EA6 29.46%, #7A66FF 85.14%, #8877FC 196.51%)',
  [BmiRiskLevel.BelowNormal]:
    'linear-gradient(109deg, #FFAA3C -30.74%, #FB8EA6 12.59%, #7A66FF 55.93%, #8877FC 142.6%)',
  [BmiRiskLevel.Normal]:
    'linear-gradient(108deg, #7A66FF 24.52%, #8877FC 74.93%)',
  [BmiRiskLevel.AboveNormal]:
    'linear-gradient(108deg, #7A66FF 24.52%, #8877FC 74.93%)',
  [BmiRiskLevel.High]:
    'linear-gradient(208deg, #FA5858 -17.26%, #7A66FF 67.66%, #8877FC 152.58%)',
  [BmiRiskLevel.VeryHigh]:
    'linear-gradient(197deg, #FA5858 15.4%, #7A66FF 102.1%, #8877FC 188.8%)',
};

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
