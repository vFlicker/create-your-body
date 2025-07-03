import styled from '@emotion/styled';
import { JSX } from 'react';

import closeIconSrc from '~/shared/assets/svg/close.svg';
import { Color } from '~/shared/theme/colors';

type CloseButtonProps = {
  className?: string;
  onClick?: () => void;
};

export function CloseButton({
  className,
  onClick,
}: CloseButtonProps): JSX.Element {
  return (
    <StyledCloseButton className={className} onClick={onClick}>
      <img src={closeIconSrc} />
    </StyledCloseButton>
  );
}

const StyledCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 38px;
  height: 28px;
  border-radius: 50px;

  background-color: ${Color.Black_100};

  z-index: 2;
`;
