import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps, JSX } from 'react';

import { Color } from '~/shared/theme/colors';

type ButtonBaseProps = {
  color: `${ButtonColor}`;
  variant?: `${ButtonVariant}`;
  iconSrc?: string;
  iconComponent?: JSX.Element;
  iconPosition?: 'left' | 'right';
};

type ButtonProps = ComponentProps<typeof StyledButton> & ButtonBaseProps;

const enum ButtonColor {
  Accent = 'accent',
  Secondary = 'secondary',
  Neutral = 'neutral',
}

const enum ButtonVariant {
  FILLED = 'filled',
  OUTLINED = 'outlined',
}

function Button({
  iconSrc,
  iconComponent,
  iconPosition = 'left',
  children,
  ...props
}: ButtonProps): JSX.Element {
  const isLeftIcon = iconPosition === 'left';

  return (
    <StyledButton {...props}>
      {isLeftIcon && iconSrc && <img src={iconSrc} />}
      {isLeftIcon && iconComponent}
      {children}
      {!isLeftIcon && iconSrc && <img src={iconSrc} />}
      {!isLeftIcon && iconComponent}
    </StyledButton>
  );
}

export { Button, ButtonColor };

const ButtonColorToCss = {
  [ButtonColor.Accent]: css`
    --color-background-button: ${Color.Violet_200};
    --color-border-button: ${Color.Violet_300};
    --color-text: ${Color.Black_50};
  `,
  [ButtonColor.Secondary]: css`
    --color-background-button: ${Color.Green_500};
    --color-border-button: ${Color.Green_500};
    --color-text: ${Color.Black_950};
  `,
  [ButtonColor.Neutral]: css`
    --color-background-button: ${Color.Black_950};
    --color-border-button: ${Color.Black_950};
    --color-text: ${Color.Black_50};
  `,
};

const ButtonVariantToCss = {
  [ButtonVariant.FILLED]: css`
    border-color: transparent;
    color: var(--color-text);
    background-color: var(--color-background-button);
  `,
  [ButtonVariant.OUTLINED]: css`
    border-color: var(--color-background-button);
    color: var(--color-border-button);
    background-color: transparent;
  `,
};

const StyledButton = styled.button<Pick<ButtonBaseProps, 'color' | 'variant'>>`
  ${({ variant = ButtonVariant.FILLED }) => ButtonVariantToCss[variant]}
  ${({ color }) => ButtonColorToCss[color]}

  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  width: 100%;
  min-height: 54px;
  border-style: solid;
  border-width: 2px;
  border-radius: 50px;

  font-size: 16px;
  font-weight: 600;

  cursor: pointer;

  &:disabled {
    color: ${Color.Black_400};
    background-color: ${Color.Black_100};
    cursor: not-allowed;
  }

  svg {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
  }
`;
