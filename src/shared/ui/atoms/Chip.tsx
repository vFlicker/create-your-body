import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { Color } from '~/shared/theme/colors';

type ChipProps = {
  color: `${ChipColor}`;
};

const enum ChipColor {
  Accent = 'accent',
  Secondary = 'secondary',
}

const ChipColorToCss = {
  [ChipColor.Accent]: css`
    --color-chip: ${Color.Violet_200};
    --color-text: ${Color.White};
  `,
  [ChipColor.Secondary]: css`
    --color-chip: ${Color.Green_500};
    --color-text: ${Color.Black};
  `,
};

const CSS = css`
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 6px 12px;
  border-radius: 8px;

  font-size: 12px;
  color: var(--color-text);

  background-color: var(--color-chip);
`;

const StyledChip = styled.div<ChipProps>`
  ${({ color }) => ChipColorToCss[color]}
  ${CSS}
`;

const StyledChipLink = styled(Link)<ChipProps>`
  ${({ color }) => ChipColorToCss[color]}
  ${CSS}
`;

export { StyledChip as Chip, StyledChipLink as ChipLink };
