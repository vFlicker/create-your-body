import styled from '@emotion/styled';
import { Children, cloneElement, JSX } from 'react';

import { ErrorText } from '../../atoms/ErrorText';

type RadioButtonGroupProps = {
  className?: string;
  label: string;
  name: string;
  error?: string;
  children: JSX.Element | JSX.Element[];
};

export function RadioButtonGroup({
  className,
  label,
  name,
  error,
  children,
}: RadioButtonGroupProps): JSX.Element {
  return (
    <StyledRadioButtonGroup className={className}>
      <Label>{label}</Label>
      <StyledRadioButtonWrapper>
        {Children.map(children, (child) => cloneElement(child, { name }))}
      </StyledRadioButtonWrapper>
      {error && <ErrorText>{error}</ErrorText>}
    </StyledRadioButtonGroup>
  );
}

const StyledRadioButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.div`
  font-size: 12px;
  color: #0d0d0d;
`;

const StyledRadioButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
