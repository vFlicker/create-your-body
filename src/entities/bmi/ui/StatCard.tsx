import styled from '@emotion/styled';
import { JSX } from 'react';

export function StatCard(): JSX.Element {
  return (
    <StyledStatCardWrapper>
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

const StyledStatCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  padding: 18px 14px;
  border-radius: 10px;

  color: #ffffff;

  background-image: linear-gradient(
    105deg,
    #ffaa3c -26.22%,
    #fb8ea6 29.46%,
    #7a66ff 85.14%,
    #8877fc 196.51%
  );
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
