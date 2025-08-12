import styled from '@emotion/styled';
import { JSX } from 'react';

import { Color } from '~/shared/theme/colors';

type BackButtonProps = {
  className?: string;
  text?: string;
  iconSrc?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export function NavButton({
  className,
  iconSrc,
  text,
  disabled,
  onClick,
}: BackButtonProps): JSX.Element {
  return (
    <StyledBackButton
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {iconSrc && <StyledIcon src={iconSrc} />}
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

  &:disabled {
    opacity: 0.5;
  }
`;

const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
`;
