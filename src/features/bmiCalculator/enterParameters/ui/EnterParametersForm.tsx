import styled from '@emotion/styled';
import { JSX } from 'react';

import { useBmiStore } from '~/entities/bmi/model/bmiStore';
import { Input } from '~/shared/ui/molecules/inputs/Input';

import { enterParametersInputs } from '../enterParametersConfig';

export function EnterParametersForm(): JSX.Element {
  const { form, setForm } = useBmiStore();

  const handleInputChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value ? Number(value) : undefined });
  };

  return (
    <StyledInputsWrapper>
      {enterParametersInputs.map(({ name, ...inputProps }) => (
        <Input
          key={name}
          {...inputProps}
          value={form[name] ?? ''}
          onChange={(evt) => handleInputChange(name, evt.target.value)}
        />
      ))}
    </StyledInputsWrapper>
  );
}

const StyledInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
