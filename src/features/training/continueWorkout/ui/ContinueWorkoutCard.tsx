import styled from '@emotion/styled';
import { JSX } from 'react';

import backgroundImageSrc from '~/shared/assets/img/continue-workout-bg.jpg';
import ClockIcon from '~/shared/assets/svg/clock-stopwatch.svg?react';
import MusclesIcon from '~/shared/assets/svg/muscles.svg?react';
import PlayIcon from '~/shared/assets/svg/play.svg?react';
import { Color } from '~/shared/theme/colors';

type ContinueWorkoutCardProps = {
  className?: string;
};

const data = {
  title: 'Тренировка #1',
  duration: '15',
  exercisesCount: 5,
};

export function ContinueWorkoutCard({
  className,
}: ContinueWorkoutCardProps): JSX.Element {
  const { title, duration, exercisesCount } = data;

  const handleClick = () => {};

  return (
    <StyledContinueWorkoutCardWrapper
      className={className}
      onClick={handleClick}
    >
      <StyledInfo>
        <StyledTitle>{title}</StyledTitle>
        <StyledMeta>
          <StyledMetaItem>
            <ClockIcon />
            {duration} мин
          </StyledMetaItem>
          <StyledMetaItem>
            <MusclesIcon />
            {exercisesCount} упр
          </StyledMetaItem>
        </StyledMeta>
      </StyledInfo>
      <StyledContinueButton>
        Продолжить
        <StyledPlayButtonIconWrapper>
          <PlayIcon />
        </StyledPlayButtonIconWrapper>
      </StyledContinueButton>
    </StyledContinueWorkoutCardWrapper>
  );
}

const backgroundImage = `url("${backgroundImageSrc}")`;

const StyledContinueWorkoutCardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 16px;
  border-radius: 8px;
  color: ${Color.White};

  background-image:
    linear-gradient(
      0deg,
      rgba(122, 102, 255, 0.8) 0%,
      rgba(122, 102, 255, 0.8) 100%
    ),
    ${backgroundImage};
  background-size: cover;
  background-position: center;
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledTitle = styled.h2`
  font-size: 14px;
  font-weight: 600;
  line-height: 100%;
`;

const StyledMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StyledMetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  font-size: 12px;
  font-weight: 500;
  line-height: 14px;

  & > svg {
    width: 14px;
    height: 14px;
    stroke: #cbff52;
  }
`;

const StyledContinueButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  padding: 10px 14px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 45px;

  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  line-height: 100%;

  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.2);
`;

const StyledPlayButtonIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #cbff52;

  & > svg {
    width: 12px;
    height: 12px;
    color: ${Color.Black_950};
  }
`;
