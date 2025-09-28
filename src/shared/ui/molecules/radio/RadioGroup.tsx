import styled from '@emotion/styled';
import { Children, cloneElement, JSX } from 'react';

import { ErrorText } from '../../atoms/ErrorText';

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
      <StyledLabel>{label}</StyledLabel>
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
  gap: 28px;
`;

const StyledLabel = styled.div`
  position: relative;

  color: #7a66ff;
  font-size: 14px;
  font-weight: 600;
  line-height: 120%;

  &::after {
    content: '';

    position: absolute;
    bottom: -12px;
    left: 0;

    width: 100%;
    height: 1px;

    background-color: #f0f0f3;
  }
`;

const StyledRadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  & label:not(:last-child) {
    position: relative;

    &::after {
      content: '';

      position: absolute;
      bottom: -16px;
      left: 0;

      width: 100%;
      height: 1px;

      background-color: #f0f0f3;
    }
  }
`;
