import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import checkIconSrc from '~/shared/assets/svg/check.svg';
import { AppRoute } from '~/shared/router';
import { Button } from '~/shared/ui/atoms/Button';

export function VideoScreen(): JSX.Element {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(AppRoute.Dashboard);
  };

  return (
    <StyledViewVideoModeWrapper>
      <StyledVideoInfo>
        <StyledVideo
          src="https://kinescope.io/fmKGvenyUm6rNyy8rByazE"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
          allowFullScreen
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
        Завершить
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

const StyledVideo = styled.iframe`
  height: 100%;
  width: 100%;

  border: none;
  border-radius: 14px;

  background-color: #000000;
  aspect-ratio: 16 / 9;

  overflow: hidden;
`;

const StyledText = styled.p`
  font-size: 14px;
  color: #0d0d0d;
`;
