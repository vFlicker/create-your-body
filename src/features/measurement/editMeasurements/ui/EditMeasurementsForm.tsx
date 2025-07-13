import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { JSX } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useUpdateMeasurements } from '~/entities/measurement';
import { showTelegramAlert } from '~/shared/libs/telegram';
import { AppRoute } from '~/shared/router';
import { Button } from '~/shared/ui/atoms/Button';
import { Input } from '~/shared/ui/molecules/Input';

import { measurementsInputs } from '../../measurementsConfig';
import {
  EditMeasurements,
  editMeasurementsSchema,
} from '../model/editMeasurementsSchema';

type EditMeasurementsFormProps = {
  className?: string;
  reportId: number;
  measurements: EditMeasurements;
};

export function EditMeasurementsForm({
  className,
  reportId,
  measurements,
}: EditMeasurementsFormProps): JSX.Element {
  const navigate = useNavigate();

  const { updateMeasurementsMutate, isUpdateMeasurementsPending } =
    useUpdateMeasurements();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditMeasurements>({
    resolver: zodResolver(editMeasurementsSchema),
    defaultValues: measurements,
  });

  const onSubmit = async (data: EditMeasurements) => {
    try {
      await updateMeasurementsMutate({ id: reportId, dto: data });
      navigate(AppRoute.Measurements);
    } catch (error) {
      console.error('Error saving measurements:', error);
      showTelegramAlert('Ошибка при сохранении параметров.');
    }
  };

  return (
    <StyledForm className={className} onSubmit={handleSubmit(onSubmit)}>
      <StyledFieldset>
        <StyledInputsWrapper>
          {measurementsInputs.map(({ label, name, postfix, step }) => (
            <Input
              key={name}
              label={label}
              type="number"
              step={step}
              placeholder="0"
              postfix={postfix}
              {...register(name)}
              error={errors[name]?.message}
            />
          ))}
        </StyledInputsWrapper>
      </StyledFieldset>
      <StyledSubmitButton
        type="submit"
        color="accent"
        disabled={isUpdateMeasurementsPending}
      >
        Сохранить
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
