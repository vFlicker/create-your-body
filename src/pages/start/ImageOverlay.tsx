import styled from '@emotion/styled';
import { JSX } from 'react';

import element from '~/shared/assets/img/element.png';
import startPhoto from '~/shared/assets/img/start.jpg';

export function ImageOverlay(): JSX.Element {
  return (
    <StyledImageContainer>
      <StyledOverlayImage />
    </StyledImageContainer>
  );
}

const StyledImageContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const StyledOverlayImage = styled.div`
  width: 100%;
  height: 97%;

  background-size: cover;
  background-position: center;
  background-image: url(${startPhoto});

  mask-size: cover;
  mask-position: bottom;
  mask-image: url(${element});
  -webkit-mask-image: url(${element});
  -webkit-mask-size: cover;
  -webkit-mask-position: bottom;
`;
