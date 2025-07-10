import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { JSX } from 'react';
import { useForm } from 'react-hook-form';

import { showTelegramAlert } from '~/shared/libs/telegram';
import { Button } from '~/shared/ui/atoms/Button';
import { Input } from '~/shared/ui/molecules/Input';

import { nutritionReportInputs } from '../../measurementsConfig';
import {
  CreateNutritionReport,
  createNutritionReportSchema,
} from '../model/createNutritionReportSchema';

export function CreateNutritionReportForm(): JSX.Element {
  const isCreateNutritionReportPending = false;
  // const { createNutritionReport, isCreateNutritionReportPending } =
  //   useCreateMeasurements();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNutritionReport>({
    resolver: zodResolver(createNutritionReportSchema),
  });

  const onSubmit = async (data: CreateNutritionReport) => {
    try {
      console.log('Measurements saved:', data);

      // await createMeasurements({ dto: data });
      // navigate(AppRoute.Measurements);
    } catch (error) {
      console.error('Error saving nutrition report:', error);
      showTelegramAlert('Ошибка при сохранении отчёта о питании');
    }
  };

  return (
    <StyledCreateNutritionReportFormWrapper>
      <StyledTitle>Добавить отчет</StyledTitle>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledInputsWrapper>
          {nutritionReportInputs.map((inputsGroup) => {
            return (
              <StyledInputsGroup columns={inputsGroup.length}>
                {inputsGroup.map(({ label, name }) => (
                  <Input
                    key={name}
                    label={label}
                    type="number"
                    placeholder="0"
                    {...register(name)}
                    error={errors[name]?.message}
                  />
                ))}
              </StyledInputsGroup>
            );
          })}
        </StyledInputsWrapper>
        <StyledSubmitButton
          type="submit"
          color="accent"
          disabled={isCreateNutritionReportPending}
        >
          Сохранить
        </StyledSubmitButton>
      </StyledForm>
    </StyledCreateNutritionReportFormWrapper>
  );
}

const StyledCreateNutritionReportFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledTitle = styled.div`
  color: #0d0d0d;
  font-size: 18px;
  font-weight: 700;
  line-height: 120%;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 24px;
`;

const StyledInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledInputsGroup = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(
    ${({ columns }) => columns},
    minmax(103px, 1fr)
  );
  gap: 16px;
`;

const StyledSubmitButton = styled(Button)`
  margin-top: auto;
`;
