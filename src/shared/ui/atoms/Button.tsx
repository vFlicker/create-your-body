import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps, JSX } from 'react';
import { Link } from 'react-router-dom';

import { Color } from '~/shared/theme/colors';

type ButtonBaseProps = {
  color: `${ButtonColor}`;
  iconSrc?: string;
  iconPosition?: 'left' | 'right';
};

type ButtonProps = ComponentProps<typeof StyledButton> & ButtonBaseProps;
type ButtonLinkProps = ComponentProps<typeof StyledButtonLink> &
  ButtonBaseProps;

const enum ButtonColor {
  Accent = 'accent',
  Secondary = 'secondary',
  Neutral = 'neutral',
}

function Button({
  iconSrc,
  iconPosition = 'left',
  children,
  ...props
}: ButtonProps): JSX.Element {
  const isLeftIcon = iconPosition === 'left';

  return (
    <StyledButton {...props}>
      {isLeftIcon && iconSrc && <img src={iconSrc} />}
      {children}
      {!isLeftIcon && iconSrc && <img src={iconSrc} />}
    </StyledButton>
  );
}

function ButtonLink({
  iconSrc,
  iconPosition = 'left',
  children,
  ...props
}: ButtonLinkProps): JSX.Element {
  const isLeftIcon = iconPosition === 'left';

  return (
    <StyledButtonLink {...props}>
      {isLeftIcon && iconSrc && <img src={iconSrc} />}
      {children}
      {!isLeftIcon && iconSrc && <img src={iconSrc} />}
    </StyledButtonLink>
  );
}

export { Button, ButtonColor, ButtonLink };

const ButtonColorToCss = {
  [ButtonColor.Accent]: css`
    --color-button: ${Color.Violet_200};
    --color-text: ${Color.Black_50};
  `,
  [ButtonColor.Secondary]: css`
    --color-button: ${Color.Green_500};
    --color-text: ${Color.Black_950};
  `,
  [ButtonColor.Neutral]: css`
    --color-button: ${Color.Black_950};
    --color-text: ${Color.Black_50};
  `,
};

const CSS = css`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  width: 100%;
  min-height: 54px;
  border-radius: 50px;

  color: var(--color-text);
  font-size: 16px;
  font-weight: 600;

  background-color: var(--color-button);

  cursor: pointer;

  &:disabled {
    color: ${Color.Black_400};
    background-color: ${Color.Black_100};
    cursor: not-allowed;
  }

  svg {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
  }
`;

const StyledButton = styled.button<Pick<ButtonBaseProps, 'color'>>`
  ${({ color }) => ButtonColorToCss[color]}
  ${CSS}
`;

const StyledButtonLink = styled(Link)<Pick<ButtonBaseProps, 'color'>>`
  ${({ color }) => ButtonColorToCss[color]}
  ${CSS}
`;
