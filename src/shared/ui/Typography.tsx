import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Color } from '~/shared/theme/colors';

type TypographyProps = {
  variant: `${TypographyVariant}`;
  $color?: Color;
};

const enum TypographyVariant {
  BODY_1_2 = 'body-1.2',
}

const TypographyVariantToCss = {
  [TypographyVariant.BODY_1_2]: css`
    font-size: 16px;
    font-weight: 600;
  `,
};

const StyledTypography = styled.div<TypographyProps>`
  line-height: 100%;

  ${({ $color = Color.Black_950 }) => `color: ${$color};`}
  ${({ variant }) => TypographyVariantToCss[variant]}
`;

export { StyledTypography as Typography, TypographyVariantToCss };
