import styled from '@emotion/styled';
import { ComponentProps, JSX } from 'react';

import { Color } from '~/shared/theme/colors';

type RadioProps = ComponentProps<typeof StyledInput> & {
  label: string;
};

export function Radio({ label, ...props }: RadioProps): JSX.Element {
  return (
    <StyledLabel>
      <StyledInput type="radio" {...props} />
      <span>{label}</span>
    </StyledLabel>
  );
}

const StyledInput = styled.input`
  position: absolute;
  height: 0;
  width: 0;
  opacity: 0;
  cursor: pointer;

  &:checked + span {
    color: ${Color.White};
    background-color: ${Color.Violet_200};
  }
`;

const StyledLabel = styled.label`
  position: relative;

  display: inline-flex;
  align-items: center;

  color: ${Color.Black_400};
  font-size: 16px;
  font-weight: 600;

  user-select: none;
  cursor: pointer;

  span {
    display: flex;
    align-items: center;
    justify-content: center;

    min-width: 78px;
    min-height: 48px;
    padding: 14px 28px;
    border-radius: 50px;

    background-color: ${Color.Black_50};
  }
`;
