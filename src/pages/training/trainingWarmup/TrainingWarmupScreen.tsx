import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import checkIconSrc from '~/shared/assets/svg/check.svg';
import { AppRoute } from '~/shared/router';
import { Button } from '~/shared/ui/Button';

import { VideoData } from './trainingWarmupTypes';

type TrainingWarmupScreenProps = {
  buttonText: string;
  videos: VideoData[];
};

export function TrainingWarmupScreen({
  buttonText,
  videos: data,
}: TrainingWarmupScreenProps): JSX.Element {
  const navigate = useNavigate();

  const handleCompleteClick = () => {
    navigate(AppRoute.TrainingCategories);
  };

  return (
    <StyledTrainingWarmupScreenWrapper>
      <StyledVideoList>
        {data.map(({ text, videoUrl }) => (
          <StyledVideoContent key={videoUrl}>
            <StyledVideo
              src={videoUrl}
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
              allowFullScreen
            />
            <StyledText>{text}</StyledText>
          </StyledVideoContent>
        ))}
      </StyledVideoList>
      <Button
        color="secondary"
        iconSrc={checkIconSrc}
        onClick={handleCompleteClick}
      >
        {buttonText}
      </Button>
    </StyledTrainingWarmupScreenWrapper>
  );
}

const StyledTrainingWarmupScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const StyledVideoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledVideoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledVideo = styled.iframe`
  aspect-ratio: 9/16;
  border-radius: 8px;
  border: none;
  background-color: #f5f5f5;
`;

const StyledText = styled.p`
  color: #0d0d0d;
  font-size: 14px;
`;
