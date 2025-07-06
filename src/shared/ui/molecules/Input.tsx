import styled from '@emotion/styled';
import { ComponentProps, JSX } from 'react';

import { ErrorText } from '../atoms/ErrorText';

type InputProps = ComponentProps<typeof StyledInput> & {
  label: string;
  postfix?: string;
  error?: string;
};

export function Input({
  className,
  label,
  postfix,
  error,
  ...props
}: InputProps): JSX.Element {
  return (
    <StyledInputWrapper className={className}>
      <StyledLabel>
        <StyledLabelText>{label}</StyledLabelText>
        <StyledInput {...props} />
        {postfix && <StyledPostfix>{postfix}</StyledPostfix>}
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
  position: relative;

  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 22px;

  color: #0d0d0d;
  font-size: 12px;
`;

const StyledLabelText = styled.span`
  position: absolute;
  top: 0;
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

const StyledPostfix = styled.span`
  position: absolute;
  right: 20px;
  top: 42px;

  color: #878787;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
`;
