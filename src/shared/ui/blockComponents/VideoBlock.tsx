import styled from '@emotion/styled';
import { JSX } from 'react';

type VideoBlockProps = {
  embedCode: string;
};

export function VideoBlock({ embedCode }: VideoBlockProps): JSX.Element {
  return (
    <StyledVideoBlockWrapper>
      <StyledVideoContent>
        <div dangerouslySetInnerHTML={{ __html: embedCode }} />
      </StyledVideoContent>
    </StyledVideoBlockWrapper>
  );
}

const StyledVideoBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledVideoContent = styled.div`
  iframe {
    width: 100%;
    aspect-ratio: 9/16;
    border-radius: 8px;
    background-color: #f5f5f5;
  }
`;
