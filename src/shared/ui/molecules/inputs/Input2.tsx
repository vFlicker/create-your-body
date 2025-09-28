import styled from '@emotion/styled';
import { ComponentProps, JSX } from 'react';

import { ErrorText } from '../../atoms/ErrorText';

type Input2Props = ComponentProps<typeof StyledInput> & {
  postfix?: string;
  error?: string;
};

export function Input2({
  className,
  postfix,
  error,
  value,
  ...props
}: Input2Props): JSX.Element {
  return (
    <StyledInput2Wrapper className={className}>
      <StyledInputContainer>
        <StyledInput value={value} {...props} />
        {!!value && !!postfix && <StyledPostfix>{postfix}</StyledPostfix>}
      </StyledInputContainer>
      {error && <ErrorText>{error}</ErrorText>}
    </StyledInput2Wrapper>
  );
}

const StyledInput2Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const StyledInputContainer = styled.label`
  position: relative;
`;

const StyledInput = styled.input`
  display: flex;
  width: 100%;
  padding: 14px 18px;
  border-radius: 8px;

  color: #0d0d0d;
  font-size: 16px;
  font-weight: 600;

  background-color: #f2f2f2;

  &::placeholder {
    color: #a4a4b6;
    font-size: 12px;
    font-weight: 500;
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const StyledPostfix = styled.span`
  position: absolute;
  right: 12px;
  top: 19px;

  color: #878787;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
`;
