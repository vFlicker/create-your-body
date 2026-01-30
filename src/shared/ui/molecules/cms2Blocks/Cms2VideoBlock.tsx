import styled from '@emotion/styled';
import { JSX, useEffect, useState } from 'react';

type Cms2VideoBlockProps = {
  src: string;
  platform: 'kinescope' | 'youtube';
  isVertical?: boolean;
};

export function Cms2VideoBlock({
  src,
  isVertical = true,
}: Cms2VideoBlockProps): JSX.Element {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const aspectRatio = isVertical ? '9/16' : '16/9';

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  const toggleFullscreen = () => setIsFullscreen((prev) => !prev);

  if (isFullscreen) {
    return (
      <StyledFullscreenWrapper>
        <StyledCloseButton onClick={toggleFullscreen}>✕</StyledCloseButton>
        <StyledFullscreenVideo>
          <iframe
            src={src}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write;"
            frameBorder="0"
            allowFullScreen
          />
        </StyledFullscreenVideo>
      </StyledFullscreenWrapper>
    );
  }

  return (
    <StyledVideoBlockWrapper>
      <StyledVideoContent $aspectRatio={aspectRatio}>
        <iframe
          src={src}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write;"
          frameBorder="0"
          allowFullScreen
        />
        <StyledFullscreenButton onClick={toggleFullscreen}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
        </StyledFullscreenButton>
      </StyledVideoContent>
    </StyledVideoBlockWrapper>
  );
}

const StyledVideoBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledVideoContent = styled.div<{ $aspectRatio: string }>`
  position: relative;

  iframe {
    width: 100%;
    aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
    border-radius: 8px;
    background-color: #f5f5f5;
  }
`;

const StyledFullscreenButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  z-index: 10;
`;

const StyledFullscreenWrapper = styled.div`
  position: fixed;
  top: calc(
    var(--tg-safe-area-inset-top, 0px) +
      var(--tg-content-safe-area-inset-top, 0px)
  );
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  z-index: 10;
`;

const StyledFullscreenVideo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  iframe {
    width: 100%;
    height: 100%;
    max-height: 100vh;
  }
`;
