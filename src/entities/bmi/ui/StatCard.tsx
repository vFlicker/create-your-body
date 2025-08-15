import styled from '@emotion/styled';
import { JSX } from 'react';

const gradients = {
  minVeryVeryBad:
    'linear-gradient(108deg, #ff9d3c 6.67%, #fb8ea6 55.35%, #7a66ff 104.03%, #8877fc 201.4%)',
  minVeryBad:
    'linear-gradient(105deg, #FFAA3C -26.22%, #FB8EA6 29.46%, #7A66FF 85.14%, #8877FC 196.51%)',
  minBad:
    'linear-gradient(109deg, #FFAA3C -30.74%, #FB8EA6 12.59%, #7A66FF 55.93%, #8877FC 142.6%)',
  normal: 'linear-gradient(108deg, #7A66FF 24.52%, #8877FC 74.93%)',
  maxBad:
    'linear-gradient(208deg, #FA5858 -17.26%, #7A66FF 67.66%, #8877FC 152.58%)',
  maxVeryBad:
    'linear-gradient(197deg, #FA5858 15.4%, #7A66FF 102.1%, #8877FC 188.8%)',
};

export function StatCard(): JSX.Element {
  return (
    <StyledStatCardWrapper gradient={gradients.maxVeryBad}>
      <StyledContent>
        <StyledTitle>Ваш уровень белка (0,4 г/кг веса)</StyledTitle>
        <StyledValue>⚠️ 40 г</StyledValue>
        <StyledDescription>
          Крайне низкое потребление белка. Может привести к серьёзной потере
          мышечной массы, слабости и проблемам с иммунитетом.
        </StyledDescription>
      </StyledContent>

      <StyledList>
        <StyledItem>🔥 164 ккал</StyledItem>
        <StyledItem>📊 11% от рациона</StyledItem>
      </StyledList>
    </StyledStatCardWrapper>
  );
}

const StyledStatCardWrapper = styled.div<{ gradient: string }>`
  display: flex;
  flex-direction: column;
  gap: 24px;

  padding: 18px 14px;
  border-radius: 10px;

  color: #ffffff;

  background-image: ${({ gradient }) => gradient};
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
