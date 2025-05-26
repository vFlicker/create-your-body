import styled from '@emotion/styled';
import { JSX } from 'react';

import { Color } from '../theme/colors';

export function Loader(): JSX.Element {
  return (
    <StyledLoaderContainer>
      <StyledSpinner />
    </StyledLoaderContainer>
  );
}

const StyledLoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  width: 100%;
  height: 100%;
`;

const StyledSpinner = styled.div`
  width: 50px;
  height: 50px;

  border-width: 4px;
  border-style: solid;
  border-color: ${Color.Black_100};
  border-top-color: ${Color.Violet_100};
  border-radius: 50%;

  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
