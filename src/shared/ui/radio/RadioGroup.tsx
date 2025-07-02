import styled from '@emotion/styled';
import { Children, cloneElement, JSX } from 'react';

import { ErrorText } from '../ErrorText';

type RadioGroupProps = {
  className?: string;
  label: string;
  name: string;
  error?: string;
  children: JSX.Element | JSX.Element[];
};

export function RadioGroup({
  className,
  label,
  name,
  error,
  children,
}: RadioGroupProps): JSX.Element {
  return (
    <StyledRadioGroup className={className}>
      <Label>{label}</Label>
      <StyledRadioWrapper>
        {Children.map(children, (child) => cloneElement(child, { name }))}
      </StyledRadioWrapper>
      {error && <ErrorText>{error}</ErrorText>}
    </StyledRadioGroup>
  );
}

const StyledRadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.div`
  font-size: 12px;
  color: #0d0d0d;
`;

const StyledRadioWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
