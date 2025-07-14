import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { JSX } from 'react';
import { useForm } from 'react-hook-form';

import { useDailyReports, useUpdateDailyReport } from '~/entities/dailyReport';
import { showTelegramAlert } from '~/shared/libs/telegram';
import { Button } from '~/shared/ui/atoms/Button';
import { ErrorText } from '~/shared/ui/atoms/ErrorText';
import { Input } from '~/shared/ui/molecules/Input';

import { dailyReportInputs } from '../../dailyReportConfig';
import {
  EditDailyReport,
  editDailyReportSchema,
} from '../model/editDailyReportSchema';

type EditDailyReportFormProps = {
  className?: string;
  reportId: number;
  onFormSubmit?: () => void;
};

export function EditDailyReportForm({
  className,
  reportId,
  onFormSubmit,
}: EditDailyReportFormProps): JSX.Element {
  const { dailyReports } = useDailyReports();
  const { updateDailyReportsMutate, isUpdateDailyReportsPending } =
    useUpdateDailyReport();

  const dailyReport = dailyReports?.find(({ id }) => id === reportId);

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<EditDailyReport>({
    resolver: zodResolver(editDailyReportSchema),
    defaultValues: dailyReport,
  });

  const onSubmit = async (data: EditDailyReport) => {
    try {
      await updateDailyReportsMutate({ id: reportId, dto: data });
      onFormSubmit?.();
    } catch (error) {
      console.error('Error saving daily report:', error);
      showTelegramAlert('Ошибка при сохранении отчёта о питании');
    }
  };

  return (
    <StyledEditDailyReportFormWrapper className={className}>
      <StyledTitle>Отчёт #{dailyReport?.reportNumber}</StyledTitle>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledInputsWrapper>
          {dailyReportInputs.map((inputsGroup) => {
            return (
              <StyledInputsGroup columns={inputsGroup.length}>
                {inputsGroup.map(({ label, name, inputMode, step, type }) => (
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
          disabled={isUpdateDailyReportsPending}
        >
          Сохранить
        </StyledSubmitButton>
      </StyledForm>
    </StyledEditDailyReportFormWrapper>
  );
}

const StyledEditDailyReportFormWrapper = styled.div`
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
