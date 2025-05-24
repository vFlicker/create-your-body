import styled from '@emotion/styled';
import { JSX } from 'react';
import { useLocation } from 'react-router-dom';

import closeIconSrc from '~/shared/assets/svg/close.svg';
import closeStartIconSrc from '~/shared/assets/svg/closeWhite.svg';
import { Color } from '~/shared/theme/colors';

export function CloseButton(): JSX.Element {
  const location = useLocation();

  return (
    <StyledCloseButton onClick={() => window.Telegram.WebApp.close()}>
      <img src={location.pathname === '/' ? closeStartIconSrc : closeIconSrc} />
    </StyledCloseButton>
  );
}

const StyledCloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 38px;
  height: 28px;
  border-radius: 50px;

  background-color: ${Color.Black_100};
  backdrop-filter: blur(4px);

  z-index: 1000;
`;
