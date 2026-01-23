import styled from '@emotion/styled';
import { JSX } from 'react';

type Cms2ImageBlockProps = {
  src: string;
  alt: string;
  width?: 'full' | 'medium' | 'small';
};

export function Cms2ImageBlock({
  src,
  alt,
  width = 'full',
}: Cms2ImageBlockProps): JSX.Element {
  return (
    <StyledImageWrapper $width={width}>
      <StyledImage src={src} alt={alt} />
    </StyledImageWrapper>
  );
}

const widthMap = {
  full: '100%',
  medium: '75%',
  small: '50%',
};

const StyledImageWrapper = styled.div<{ $width: 'full' | 'medium' | 'small' }>`
  width: ${({ $width }) => widthMap[$width]};
`;

const StyledImage = styled.img`
  width: 100%;
  aspect-ratio: 6/3;
  object-fit: cover;
  border-radius: 8px;
`;
