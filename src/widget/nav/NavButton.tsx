import styled from '@emotion/styled';
import { JSX } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import lockIconSrc from '~/shared/assets/svg/lock.svg';
import { Color } from '~/shared/theme/colors';

type NavButtonProps = {
  to: string;
  label: string;
  iconSrc: string;
  disabled?: boolean;
  onClick?: () => void;
};

export function NavButton({
  to,
  iconSrc,
  label,
  disabled = false,
  onClick,
}: NavButtonProps): JSX.Element {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isActive = pathname === to;

  const handleButtonClick = () => {
    if (disabled || isActive) return;

    navigate(to);
    if (onClick) onClick();
  };

  return (
    <StyledNavButtonWrapper>
      <StyledNavButton
        isActive={isActive}
        disabled={disabled}
        onClick={handleButtonClick}
      >
        <StyledIcon src={disabled ? lockIconSrc : iconSrc} />
      </StyledNavButton>
      <StyledLabel>{label}</StyledLabel>
    </StyledNavButtonWrapper>
  );
}

const StyledNavButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledNavButton = styled.button<{ isActive: boolean; disabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  width: 50px;
  height: 50px;
  border: 1px solid;
  border-radius: 50%;

  border-color: ${({ isActive, disabled }) => {
    if (disabled) return Color.Black_900;
    return isActive ? Color.Green_500 : Color.Black_100;
  }};

  background-color: ${({ isActive, disabled }) => {
    if (disabled) return Color.Black_900;
    return isActive ? Color.Green_500 : Color.Black_50;
  }};
`;

const StyledIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const StyledLabel = styled.div`
  color: ${Color.Black_950};
  font-size: 10px;
  text-align: center;
`;
