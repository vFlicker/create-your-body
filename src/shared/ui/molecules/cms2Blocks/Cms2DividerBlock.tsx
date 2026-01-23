import styled from '@emotion/styled';
import { JSX } from 'react';

type Cms2DividerBlockProps = {
  spacing?: 'small' | 'medium' | 'large';
  showLine?: boolean;
};

export function Cms2DividerBlock({
  spacing = 'medium',
  showLine = false,
}: Cms2DividerBlockProps): JSX.Element {
  return <StyledDivider $spacing={spacing} $showLine={showLine} />;
}

const spacingMap = {
  small: '8px',
  medium: '16px',
  large: '24px',
};

const StyledDivider = styled.div<{
  $spacing: 'small' | 'medium' | 'large';
  $showLine: boolean;
}>`
  height: ${({ $spacing }) => spacingMap[$spacing]};
  ${({ $showLine }) =>
    $showLine &&
    `
    border-bottom: 1px solid #e6e6e6;
  `}
`;
