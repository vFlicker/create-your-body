import styled from '@emotion/styled';
import { ComponentProps, JSX } from 'react';

import { Color } from '~/shared/theme/colors';

type ToggleCheckboxProps = ComponentProps<typeof StyledInput> & {
  label: string;
};

export function ToggleCheckbox({
  label,
  ...props
}: ToggleCheckboxProps): JSX.Element {
  return (
    <StyledLabel>
      <StyledInput type="checkbox" {...props} />
      <StyledToggle>
        <StyledThumb />
      </StyledToggle>
      <StyledText>{label}</StyledText>
    </StyledLabel>
  );
}

const StyledInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const StyledThumb = styled.span`
  position: absolute;
  top: 4px;
  left: 4px;

  width: 18px;
  height: 18px;
  border-radius: 50%;

  background-color: ${Color.White};
`;

const StyledToggle = styled.span`
  position: relative;

  flex-shrink: 0;
  display: inline-block;

  width: 46px;
  height: 26px;
  border-radius: 40px;

  background-color: ${Color.Black_200};
`;

const StyledText = styled.span`
  color: #403c77;
  font-size: 14px;
  font-weight: 700;
  line-height: 130%;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 16px;

  cursor: pointer;
  user-select: none;

  ${StyledInput}:checked + ${StyledToggle} {
    background-color: ${Color.Violet_200};

    ${StyledThumb} {
      transform: translateX(20px);
    }
  }
`;
