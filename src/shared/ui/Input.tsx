import styled from '@emotion/styled';
import { ComponentProps, JSX } from 'react';

import { ErrorText } from './ErrorText';

type InputProps = ComponentProps<typeof StyledInput> & {
  label: string;
  error?: string;
};

export function Input({
  className,
  label,
  error,
  ...props
}: InputProps): JSX.Element {
  return (
    <StyledInputWrapper className={className}>
      <StyledLabel>
        {label}
        <StyledInput {...props} />
      </StyledLabel>
      {error && <ErrorText>{error}</ErrorText>}
    </StyledInputWrapper>
  );
}

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  color: #0d0d0d;
  font-size: 12px;
`;

const StyledInput = styled.input`
  display: flex;
  padding: 14px 18px;
  border: 1px solid #e6e6e6;
  border-radius: 50px;

  color: #0d0d0d;
  font-size: 14px;
  font-weight: 400;

  background-color: #f2f2f2;

  &::placeholder {
    color: #999999;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
