import styled from '@emotion/styled';
import { JSX } from 'react';

import { Color } from '../../theme/colors';

type TogglerProps = {
  values: [string, string];
  activeValue: string;
  backgroundColor?: Color;
  className?: string;
  onClick: (value: string) => void;
};

export function Toggler({
  className,
  values,
  activeValue,
  backgroundColor,
  onClick,
}: TogglerProps): JSX.Element {
  return (
    <StyledTogglerWrapper
      className={className}
      backgroundColor={backgroundColor}
    >
      {values.map((value, index) => (
        <StyledButton
          key={index}
          isActive={activeValue === value}
          onClick={() => onClick(value)}
        >
          {value}
        </StyledButton>
      ))}
    </StyledTogglerWrapper>
  );
}

const StyledTogglerWrapper = styled.div<{ backgroundColor?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 8px;
  border-radius: 45px;

  background-color: ${({ backgroundColor = Color.Black_50 }) =>
    backgroundColor};
`;

const StyledButton = styled.button<{ isActive: boolean }>`
  width: 100%;
  padding: 12px 28px;
  border-radius: 45px;

  color: ${({ isActive }) => (isActive ? Color.White : Color.Violet_200)};
  font-size: 16px;
  font-weight: 700;

  background-color: ${({ isActive }) =>
    isActive ? Color.Violet_200 : 'transparent'};

  cursor: pointer;
`;
