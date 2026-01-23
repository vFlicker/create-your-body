import styled from '@emotion/styled';
import { JSX } from 'react';

type Cms2VideoBlockProps = {
  src: string;
  platform: 'kinescope' | 'youtube';
  isVertical?: boolean;
};

export function Cms2VideoBlock({
  src,
  isVertical = true,
}: Cms2VideoBlockProps): JSX.Element {
  const aspectRatio = isVertical ? '9/16' : '16/9';

  return (
    <StyledVideoBlockWrapper>
      <StyledVideoContent $aspectRatio={aspectRatio}>
        <iframe
          src={src}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write;"
          frameBorder="0"
          allowFullScreen
        />
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
  iframe {
    width: 100%;
    aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
    border-radius: 8px;
    background-color: #f5f5f5;
  }
`;
