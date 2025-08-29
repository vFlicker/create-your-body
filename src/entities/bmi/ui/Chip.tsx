import { css } from '@emotion/react';
import styled from '@emotion/styled';

type ChipProps = {
  color: `${ChipColor}`;
};

const enum ChipColor {
  Warning = 'warning',
  Normal = 'normal',
  Attention = 'attention',
}

const ChipColorToCss = {
  [ChipColor.Warning]: css`
    --color-chip: rgba(255, 171, 60, 0.15);
    --color-text: #ffab3c;
  `,
  [ChipColor.Normal]: css`
    --color-chip: rgba(122, 102, 255, 0.18);
    --color-text: #7a66ff;
  `,
  [ChipColor.Attention]: css`
    --color-chip: #fee4e4;
    --color-text: #e74c4c;
  `,
};

const StyledChip = styled.div<ChipProps>`
  ${({ color }) => ChipColorToCss[color]}

  display: flex;
  align-items: center;
  align-self: flex-start;

  padding: 10px;
  border-radius: 50px;

  color: var(--color-text);
  font-size: 10px;
  font-weight: 700;
  line-height: 14px;

  background-color: var(--color-chip);
`;

export { StyledChip as Chip, ChipColor };
