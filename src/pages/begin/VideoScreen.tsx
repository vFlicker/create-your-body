import styled from '@emotion/styled';
import { JSX, useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUpdateGreetVideoProgress } from '~/entities/user';
import checkIconSrc from '~/shared/assets/svg/check.svg';
import beginVideoSrc from '~/shared/assets/video/begin.mp4';
import { debounce } from '~/shared/libs/debounce';
import { userSession } from '~/shared/libs/userSession';
import { Button } from '~/shared/ui/Button';
import { VideoPlayer } from '~/shared/ui/videoPlayer';

export function VideoScreen(): JSX.Element {
  const togglePlayRef = useRef<() => void>(() => {});

  const navigate = useNavigate();
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  const currentUserSession = userSession.getCurrentUser();
  const { updateGreetVideoProgress } = useUpdateGreetVideoProgress();

  const handleButtonClick = () => {
    if (isVideoEnded) navigate('/dashboard');
    else togglePlayRef.current(); // Toggle play/pause
  };

  const debouncedSendVideoUpdate = useCallback(
    ({ duration }: { currentTime: string; duration: string }) => {
      return debounce(async () => {
        try {
          if (!currentUserSession) return;
          const { tgId } = currentUserSession;
          await updateGreetVideoProgress({ tgId, duration: duration });
        } catch (err) {
          console.error('Failed to send video update:', err);
        }
      }, 5000)();
    },
    [currentUserSession, updateGreetVideoProgress],
  );

  return (
    <StyledViewVideoModeWrapper>
      <StyledVideoInfo>
        <VideoPlayer
          togglePlayRef={togglePlayRef}
          videoSrc={beginVideoSrc}
          onVideoUpdate={debouncedSendVideoUpdate}
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
