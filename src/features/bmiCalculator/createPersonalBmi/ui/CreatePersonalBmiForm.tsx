import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { JSX } from 'react';
import { useForm } from 'react-hook-form';

import { useCreatePersonalBmi } from '~/entities/bmi';
import { showTelegramAlert } from '~/shared/libs/telegram';
import { Button } from '~/shared/ui/atoms/Button';
import { ErrorText } from '~/shared/ui/atoms/ErrorText';
import { Input } from '~/shared/ui/molecules/inputs/Input';

import { personalBmiInputs } from '../config/personalBmiConfig';
import {
  CreatePersonalBmi,
  createPersonalBmiSchema,
} from '../model/createPersonalBmiSchema';

type CreatePersonalBmiFormProps = {
  onCalculateProgrammaticallyClick: () => void;
  onFormSubmit?: () => void;
};

export function CreatePersonalBmiForm({
  onCalculateProgrammaticallyClick,
  onFormSubmit,
}: CreatePersonalBmiFormProps): JSX.Element {
  const { createPersonalBmi, isCreatePersonalBmiPending } =
    useCreatePersonalBmi();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePersonalBmi>({
    resolver: zodResolver(createPersonalBmiSchema),
  });

  const onSubmit = async (report: CreatePersonalBmi) => {
    try {
      await createPersonalBmi({ dto: report });
      onFormSubmit?.();
    } catch (error) {
      console.error('Error saving daily report:', error);
      showTelegramAlert('Ошибка при сохранении данных для расчёта ИМТ');
    }
  };

  return (
    <CreatePersonalBmiFormWrapper>
      <StyledTitle>Изменить данные</StyledTitle>

      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledInputsWrapper>
          {personalBmiInputs.map((inputsGroup) => {
            return (
              <StyledInputsGroup columns={inputsGroup.length}>
                {inputsGroup.map(({ label, name, type, inputMode, step }) => (
                  <Input
                    key={name}
                    label={label}
                    type={type}
                    inputMode={inputMode}
                    step={step}
                    placeholder="0"
                    {...register(name)}
                    error={errors[name]?.message}
                  />
                ))}
              </StyledInputsGroup>
            );
          })}
        </StyledInputsWrapper>
        {errors.common && <ErrorText>{errors.common.message}</ErrorText>}
        <StyledSubmitButton
          type="submit"
          color="accent"
          disabled={isCreatePersonalBmiPending}
        >
          Сохранить
        </StyledSubmitButton>

        <div>
          <StyledSubtitle>
            Или расчитайте снова с помощью нашего калькулятора
          </StyledSubtitle>
          <StyledSubmitButton
            type="button"
            color="secondary"
            disabled={isCreatePersonalBmiPending}
            onClick={onCalculateProgrammaticallyClick}
          >
            Рассчитать
          </StyledSubmitButton>
        </div>
      </StyledForm>
    </CreatePersonalBmiFormWrapper>
  );
}

const CreatePersonalBmiFormWrapper = styled.div`
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

const StyledSubtitle = styled.div`
  margin-bottom: 10px;

  color: #0d0d0d;
  font-size: 14px;
  font-weight: 400;
  line-height: 120%;
`;
