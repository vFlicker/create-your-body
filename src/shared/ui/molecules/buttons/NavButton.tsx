import styled from '@emotion/styled';
import { JSX } from 'react';

import { Color } from '~/shared/theme/colors';

type BackButtonProps = {
  className?: string;
  text: string;
  iconSrc?: string;
  onClick?: () => void;
};

export function NavButton({
  className,
  iconSrc,
  text,
  onClick,
}: BackButtonProps): JSX.Element {
  return (
    <StyledBackButton className={className} onClick={onClick}>
      {iconSrc && <img src={iconSrc} />}
      {text}
    </StyledBackButton>
  );
}

const StyledBackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;

  height: 28px;
  padding: 0 8px;
  border-radius: 50px;

  color: ${Color.Black_950};
  font-weight: 500;
  font-size: 14px;

  background-color: ${Color.Black_100};

  z-index: 2;
`;
