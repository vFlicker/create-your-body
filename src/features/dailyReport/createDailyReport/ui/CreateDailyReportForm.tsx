import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { JSX } from 'react';
import { useForm } from 'react-hook-form';

import { useCreateDailyReport } from '~/entities/dailyReport';
import { formatDateForApi } from '~/shared/libs/format';
import { showTelegramAlert } from '~/shared/libs/telegram';
import { Button } from '~/shared/ui/atoms/Button';
import { ErrorText } from '~/shared/ui/atoms/ErrorText';
import { Input } from '~/shared/ui/molecules/Input';

import { dailyReportInputs } from '../../dailyReportConfig';
import {
  CreateDailyReport,
  createDailyReportSchema,
} from '../model/createDailyReportSchema';

type CreateDailyReportFormProps = {
  date: Date;
  onFormSubmit?: () => void;
};

export function CreateDailyReportForm({
  date,
  onFormSubmit,
}: CreateDailyReportFormProps): JSX.Element {
  const { createDailyReport, isCreateDailyReportPending } =
    useCreateDailyReport();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDailyReport>({
    resolver: zodResolver(createDailyReportSchema),
  });

  const onSubmit = async (report: CreateDailyReport) => {
    try {
      await createDailyReport({
        dto: { ...report, date: formatDateForApi(date) },
      });
      onFormSubmit?.();
    } catch (error) {
      console.error('Error saving daily report:', error);
      showTelegramAlert('Ошибка при сохранении отчёта о питании');
    }
  };

  return (
    <StyledCreateDailyReportFormWrapper>
      <StyledTitle>Добавить отчет</StyledTitle>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledInputsWrapper>
          {dailyReportInputs.map((inputsGroup) => {
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
          disabled={isCreateDailyReportPending}
        >
          Сохранить
        </StyledSubmitButton>
      </StyledForm>
    </StyledCreateDailyReportFormWrapper>
  );
}

const StyledCreateDailyReportFormWrapper = styled.div`
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
