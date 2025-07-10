import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { JSX } from 'react';

import lockIconSrc from '~/shared/assets/svg/lock.svg';
import { Color } from '~/shared/theme/colors';

type IconButtonProps = {
  className?: string;
  iconSrc?: string;
  iconComponent?: JSX.Element;
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
  iconComponent,
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
        {iconSrc && <StyledIcon src={disabled ? lockIconSrc : iconSrc} />}
        {iconComponent}
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
  [IconButtonColor.Accent]: css`
    --color-icon-button: ${Color.Violet_200};
  `,
  [IconButtonColor.Secondary]: css`
    --color-icon-button: ${Color.Green_500};
  `,
};

const StyledIconButton = styled.button<StyledIconButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  width: 40px;
  height: 40px;
  border-radius: 50%;

  ${({ color }) => IconButtonColorToCss[color]}

  background-color: ${({ isActive, disabled }) => {
    if (disabled) return Color.Black_900;
    return isActive ? 'var(--color-icon-button)' : Color.Violet_10;
  }};
`;

const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const StyledText = styled.div`
  color: ${Color.Black_950};
  font-size: 10px;
  font-weight: 500;
  text-align: center;
`;
