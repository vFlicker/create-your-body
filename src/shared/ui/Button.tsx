import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps, JSX } from 'react';

import { Color } from '~/shared/theme/colors';

import { TypographyVariantToCss } from './Typography';

type ButtonBaseProps = {
  color: `${ButtonColor}`;
  icon?: JSX.Element;
};

type ButtonProps = ComponentProps<typeof StyledButton>;

const enum ButtonColor {
  Accent = 'accent',
  Secondary = 'secondary',
  Neutral = 'neutral',
}

function Button(props: ButtonProps): JSX.Element {
  return (
    <StyledButton {...props}>
      {props.icon} {props.children}
    </StyledButton>
  );
}

export { Button, ButtonColor };

const ButtonColorToCss = {
  [ButtonColor.Accent]: css`
    --color-button: ${Color.Violet_200};
    --color-text: ${Color.Black_50};
  `,
  [ButtonColor.Secondary]: css`
    --color-button: ${Color.Green_500};
    --color-text: ${Color.Black_950};};
  `,
  [ButtonColor.Neutral]: css`
    --color-button: ${Color.Black_950};
    --color-text: ${Color.Black_50};
  `,
};

const StyledButton = styled.button<ButtonBaseProps>`
  ${({ color }) => ButtonColorToCss[color]}

  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  min-height: 54px;
  border-radius: 50px;

  color: var(--color-text);
  ${TypographyVariantToCss['body-1.2']}

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
