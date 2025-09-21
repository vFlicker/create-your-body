import styled from '@emotion/styled';
import { JSX } from 'react';

import backgroundImageSrc from '~/shared/assets/img/bmi-card-bg.jpg';
import ChevronRightIcon from '~/shared/assets/svg/chevron-right.svg?react';
import ClockStopWatchIcon from '~/shared/assets/svg/clock-stopwatch.svg?react';

type BmiEmptyResultCardProps = {
  className?: string;
  onClick: () => void;
};

export function BmiEmptyResultCard({
  className,
  onClick,
}: BmiEmptyResultCardProps): JSX.Element {
  return (
    <StyledBmiEmptyResultCardWrapper className={className}>
      <StyledContent>
        <StyledTitle>⚡️ Интерактивный тренажёр по подбору КБЖУ</StyledTitle>
        <StyledTime>
          <ClockStopWatchIcon stroke="#CBFF52" /> <span>5 мин</span>
        </StyledTime>
      </StyledContent>
      <StyledButton onClick={onClick}>
        <ChevronRightIcon stroke="#ffffff" />
      </StyledButton>
    </StyledBmiEmptyResultCardWrapper>
  );
}

const backgroundImage = `url("${backgroundImageSrc}")`;

const StyledBmiEmptyResultCardWrapper = styled.div`
  position: relative;

  padding: 16px;
  border-radius: 10px;

  background-color: #b5b5a9;
  background-image:
    linear-gradient(269deg, rgba(13, 13, 13, 0) 0, rgba(13, 13, 13, 0.4) 90%),
    ${backgroundImage};

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  overflow: hidden;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  max-width: 260px;

  color: #ffffff;
`;

const StyledTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  line-height: 130%;
`;

const StyledTime = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;

  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
`;

const StyledButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;

  width: 60px;
  height: 100%;

  background-color: #a799ff;
`;
