import styled from '@emotion/styled';
import { ComponentProps, JSX } from 'react';

import CheckIcon from '~/shared/assets/svg/check-2.svg?react';

type RadioProps = ComponentProps<typeof StyledInput> & {
  label: string;
};

export function Radio({ label, ...props }: RadioProps): JSX.Element {
  return (
    <StyledLabel>
      <StyledInput type="radio" {...props} />
      <StyledMark>
        <CheckIcon stroke="#ffffff" strokeWidth="2" />
      </StyledMark>
      {label}
    </StyledLabel>
  );
}

const StyledInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const StyledMark = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;

  border: 2px solid #bab8c6;
  border-radius: 50%;

  svg {
    width: 14px;
    height: 14px;
  }
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;

  color: #0d0d0d;
  font-size: 14px;
  font-weight: 500;
  line-height: 100%;

  ${StyledInput}:checked + ${StyledMark} {
    border-color: #a799ff;
    background-color: #a799ff;
  }
`;
