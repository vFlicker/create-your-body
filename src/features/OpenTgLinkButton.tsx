import styled from '@emotion/styled';
import { ComponentProps, JSX } from 'react';

type BaseProps = {
  buttonText: string;
  iconSrc: string;
  username?: string;
};

type OpenTgLinkButtonProps = ComponentProps<typeof StyledOpenTgLinkButton> &
  BaseProps;

export function OpenTgLinkButton({
  iconSrc,
  buttonText,
  username,
  disabled,
}: OpenTgLinkButtonProps): JSX.Element {
  const handleButtonClick = () => {
    if (disabled || !username) return;
    Telegram.WebApp.openTelegramLink(`https://t.me/${username}`);
  };

  return (
    <StyledOpenTgLinkButton disabled={disabled} onClick={handleButtonClick}>
      <StyledIcon src={iconSrc} />
      {buttonText}
    </StyledOpenTgLinkButton>
  );
}

const StyledOpenTgLinkButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  height: 54px;
  border: 1px solid #e6e6e6;
  border-radius: 14px;

  font-size: 14px;
  color: #0d0d0d;

  background-color: #f2f2f2;

  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  }
`;

const StyledIcon = styled.img`
  width: 24px;
  height: 24px;
`;
