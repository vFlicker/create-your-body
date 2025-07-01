import styled from '@emotion/styled';
import { ComponentProps, JSX } from 'react';

type InputProps = ComponentProps<typeof StyledInput> & {
  label: string;
};

export function Input({ className, label, ...props }: InputProps): JSX.Element {
  return (
    <StyledLabel className={className}>
      {label}
      <StyledInput {...props} />
    </StyledLabel>
  );
}

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
`;
