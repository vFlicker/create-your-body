import styled from '@emotion/styled';
import { JSX, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import checkIconSrc from '~/shared/assets/svg/check.svg';
import beginVideoSrc from '~/shared/assets/video/begin.mp4';
import { Button } from '~/shared/ui/atoms/Button';
import { VideoPlayer } from '~/shared/ui/molecules/videoPlayer';

export function VideoScreen(): JSX.Element {
  const togglePlayRef = useRef<() => void>(() => {});

  const navigate = useNavigate();
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  const handleButtonClick = () => {
    if (isVideoEnded) navigate('/dashboard');
    else togglePlayRef.current(); // Toggle play/pause
  };

  return (
    <StyledViewVideoModeWrapper>
      <StyledVideoInfo>
        <VideoPlayer
          togglePlayRef={togglePlayRef}
          videoSrc={beginVideoSrc}
          onVideoEnd={setIsVideoEnded}
        />
        <StyledText>
          В этом видео я расскажу как подготовиться к старту программы'
        </StyledText>
      </StyledVideoInfo>
      <Button
        color="secondary"
        iconSrc={checkIconSrc}
        onClick={handleButtonClick}
      >
        {isVideoEnded ? 'Завершить' : 'Начать'}
      </Button>
    </StyledViewVideoModeWrapper>
  );
}

const StyledViewVideoModeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
`;

const StyledVideoInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledText = styled.p`
  font-size: 14px;
  color: #0d0d0d;
`;
