import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { JSX } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useCreateMeasurements } from '~/entities/measurement';
import { showTelegramAlert } from '~/shared/libs/telegram';
import { AppRoute } from '~/shared/router';
import { Button } from '~/shared/ui/atoms/Button';
import { Input } from '~/shared/ui/molecules/Input';

import { measurementsInputs } from '../../measurementsConfig';
import {
  CreateMeasurements,
  createMeasurementsSchema,
} from '../model/createMeasurementsSchema';

export function CreateMeasurementsForm(): JSX.Element {
  const navigate = useNavigate();

  const { createMeasurements, isCreateMeasurementsPending } =
    useCreateMeasurements();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMeasurements>({
    resolver: zodResolver(createMeasurementsSchema),
  });

  const onSubmit = async (data: CreateMeasurements) => {
    try {
      await createMeasurements({ dto: data });
      navigate(AppRoute.Measurements);
    } catch (error) {
      console.error('Error saving measurements:', error);
      showTelegramAlert('Ошибка при сохранении параметров.');
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledFieldset>
        <StyledInputsWrapper>
          {measurementsInputs.map(({ label, name, step, inputMode, type }) => (
            <Input
              key={name}
              label={label}
              step={step}
              type={type}
              inputMode={inputMode}
              placeholder="0"
              {...register(name)}
              error={errors[name]?.message}
            />
          ))}
        </StyledInputsWrapper>
      </StyledFieldset>
      <StyledSubmitButton
        type="submit"
        color="accent"
        disabled={isCreateMeasurementsPending}
      >
        Добавить отчёт
      </StyledSubmitButton>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 24px;
`;

const StyledFieldset = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledInputsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(150px, 1fr));
  gap: 16px;
`;

const StyledSubmitButton = styled(Button)`
  margin-top: auto;
`;
