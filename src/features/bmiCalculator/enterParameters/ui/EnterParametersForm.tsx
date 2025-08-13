import styled from '@emotion/styled';
import { JSX } from 'react';

import { Input } from '~/shared/ui/molecules/inputs/Input';

import { enterParametersInputs } from '../enterParametersConfig';

export function EnterParametersForm(): JSX.Element {
  return (
    <StyledInputsWrapper>
      {enterParametersInputs.map(({ name, ...inputProps }) => (
        <Input key={name} {...inputProps} />
      ))}
    </StyledInputsWrapper>
  );
}

const StyledInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
