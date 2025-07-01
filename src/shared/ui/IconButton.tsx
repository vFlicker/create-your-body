import styled from '@emotion/styled';
import { JSX } from 'react';

import lockIconSrc from '~/shared/assets/svg/lock.svg';
import { Color } from '~/shared/theme/colors';

type IconButtonProps = {
  className?: string;
  iconSrc: string;
  color: `${IconButtonColor}`;
  text?: string;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

type StyledIconButtonProps = Pick<
  IconButtonProps,
  'isActive' | 'disabled' | 'color'
>;

const enum IconButtonColor {
  Accent = 'accent',
  Secondary = 'secondary',
}

export function IconButton({
  className,
  iconSrc,
  text,
  color,
  isActive = false,
  disabled = false,
  onClick,
}: IconButtonProps): JSX.Element {
  return (
    <StyledIconButtonWrapper className={className}>
      <StyledIconButton
        isActive={isActive}
        disabled={disabled}
        color={color}
        onClick={onClick}
      >
        <StyledIcon src={disabled ? lockIconSrc : iconSrc} />
      </StyledIconButton>
      {text && <StyledText>{text}</StyledText>}
    </StyledIconButtonWrapper>
  );
}

const StyledIconButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const IconButtonColorToCss = {
  [IconButtonColor.Accent]: `
    --color-icon-button: ${Color.Violet_200};
  `,
  [IconButtonColor.Secondary]: `
    --color-icon-button: ${Color.Green_500};
  `,
};

const StyledIconButton = styled.button<StyledIconButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  width: 50px;
  height: 50px;
  border: 1px solid;
  border-radius: 50%;

  ${({ color }) => IconButtonColorToCss[color]}

  border-color: ${({ isActive, disabled }) => {
    if (disabled) return Color.Black_900;
    return isActive ? 'var(--color-icon-button)' : Color.Black_100;
  }};

  background-color: ${({ isActive, disabled }) => {
    if (disabled) return Color.Black_900;
    return isActive ? 'var(--color-icon-button)' : Color.Black_50;
  }};
`;

const StyledIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const StyledText = styled.div`
  color: ${Color.Black_950};
  font-size: 10px;
  text-align: center;
`;
