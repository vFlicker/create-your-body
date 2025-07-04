import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import playIconSrc from '~/shared/assets/svg/play.svg';

type HistoryProps = {
  to: string;
  text: string;
  totalDurationInSec: number;
  watchedDurationInSec: number;
  isHighlight?: boolean;
};

{
  /*
    Usage example:

    <VideoHistory
      text="Инструкция + Вводный урок"
      totalDurationInSec={365}
      watchedDurationInSec={120}
      to={`${AppRoute.Begin}?view=video`}
      isHighlight={true}
    />;
  */
}

export function VideoHistory({
  to,
  text,
  totalDurationInSec,
  watchedDurationInSec,
  isHighlight = false,
}: HistoryProps): JSX.Element {
  const navigate = useNavigate();

  const remainingDuration = totalDurationInSec - watchedDurationInSec;
  const remainingMinutes = Math.floor(remainingDuration / 60);

  return (
    <StyledVideoHistoryWrapper isHighlight={isHighlight}>
      <StyledInfoWrapper>
        <StyledText>Продолжить</StyledText>
        <StyledProgress max={totalDurationInSec} value={watchedDurationInSec} />
        <StyledBoldText>{text}</StyledBoldText>
      </StyledInfoWrapper>
      <StyledPlayButton onClick={() => navigate(to)}>
        <StyledText>{remainingMinutes} мин</StyledText>
      </StyledPlayButton>
    </StyledVideoHistoryWrapper>
  );
}

const StyledInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledText = styled.p`
  color: #0d0d0d;
  font-size: 12px;
`;

const StyledBoldText = styled.p`
  font-weight: 700;
  font-size: 14px;
  color: #0d0d0d;
`;

const StyledProgress = styled.progress`
  height: 4px;
  background: #f2f2f2;
  border-radius: 50px;
  overflow: hidden;

  &[value] {
    appearance: none;
  }

  &::-webkit-progress-bar {
    background-color: #f2f2f2;
    border-radius: 50px;
  }

  &::-webkit-progress-value {
    background-color: #a799ff;
    border-radius: 50px;
    transition: all 0.15s ease-in-out;
  }

  &::-moz-progress-bar {
    background-color: #a799ff;
    border-radius: 50px;
  }
`;

const playBackgroundImage = `url("${playIconSrc}")`;

const StyledPlayButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;

  height: 42px;
  padding: 0 8px;
  border-radius: 45px;

  &::after {
    content: '';
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 30px;
    border-radius: 50px;

    background-image: ${playBackgroundImage};
    background-repeat: no-repeat;
    background-position: center;
    background-size: 16px;
  }
`;

const StyledVideoHistoryWrapper = styled.div<{ isHighlight: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;

  height: 66px;
  padding: 0 16px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ isHighlight }) =>
    isHighlight ? '#e6e6e6' : 'transparent'};
  border-radius: 16px;

  background-color: ${({ isHighlight }) =>
    isHighlight ? '#fafafa' : '#d3ccff'};

  cursor: pointer;

  ${StyledProgress} {
    ${({ isHighlight }) => css`
      background-color: ${isHighlight ? '#e4e1fb;' : '#f2f2f2'};
      &::-webkit-progress-bar {
        background-color: ${isHighlight ? '#e4e1fb;' : '#f2f2f2'};
      }
    `}
  }

  ${StyledPlayButton} {
    ${({ isHighlight }) => css`
      background-color: ${isHighlight ? '#e4e1fb' : '#f2f2f2'};

      &::after {
        background-color: ${isHighlight ? '#a799ff' : '#cbff52'};
      }
    `}
  }
`;
