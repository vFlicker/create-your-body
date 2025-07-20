import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { JSX, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Modal, useModalStore } from '~/entities/modal';
import { ExerciseCard, useWorkoutDiaryStore } from '~/entities/workoutDiary';
import {
  useCreateWorkoutReport,
  useUpdateWorkoutReport,
} from '~/entities/workoutDiary';
import { useWorkoutReport } from '~/entities/workoutDiary/api/useWorkoutReport';
import { convertRuDateToIso, formatDateToLocaleRu } from '~/shared/libs/format';
import { Button } from '~/shared/ui/atoms/Button';
import { AddButton } from '~/shared/ui/molecules/buttons/AddButton';
import { Input } from '~/shared/ui/molecules/Input';

import { AddApproachesFrom } from '../../addApproaches';
import { AddExerciseForm } from '../../addExercise';
import {
  AddOrUpdateTraining,
  addOrUpdateTrainingSchema,
} from '../model/addOrUpdateTrainingSchema';
import { trainingFromInputs } from '../trainingFromConfig';

type TrainingFromProps = {
  id?: number;
  title?: string;
  type: 'create' | 'update';
};

export function TrainingFrom({
  id,
  title,
  type,
}: TrainingFromProps): JSX.Element {
  const { openModal, closeModal } = useModalStore();

  const { training, clearTraining, setTrainingFromExisting } =
    useWorkoutDiaryStore();

  const { workoutReport } = useWorkoutReport(id);
  const { createWorkoutReport, isCreateWorkoutReportPending } =
    useCreateWorkoutReport();
  const { updateWorkoutReport, isUpdateWorkoutReportPending } =
    useUpdateWorkoutReport();

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<AddOrUpdateTraining>({
    resolver: zodResolver(addOrUpdateTrainingSchema),
  });

  useEffect(() => {
    if (workoutReport) {
      setTrainingFromExisting({ exercises: workoutReport.exercises });
    }
  }, [workoutReport, setTrainingFromExisting]);

  useEffect(() => {
    if (workoutReport) {
      reset({
        name: workoutReport.name,
        date: formatDateToLocaleRu(workoutReport.date),
      });
    }
  }, [workoutReport, reset, type]);

  const onSubmit = async (data: AddOrUpdateTraining) => {
    if (type === 'update' && workoutReport) {
      await updateWorkoutReport({
        id: workoutReport.id,
        dto: {
          name: data.name,
          date: convertRuDateToIso(data.date),
          ...training,
        },
      });
    }

    if (type === 'create') {
      await createWorkoutReport({
        dto: {
          name: data.name,
          date: convertRuDateToIso(data.date),
          ...training,
        },
      });
    }

    clearTraining();
    closeModal();
  };

  return (
    <StyledTrainingFrom onSubmit={handleSubmit(onSubmit)}>
      <StyledTitle>{title}</StyledTitle>

      <StyledInputsWrapper>
        {trainingFromInputs.map(({ label, name, type, placeholder }) => (
          <Input
            key={name}
            label={label}
            type={type}
            placeholder={placeholder}
            {...register(name)}
            error={errors[name]?.message}
          />
        ))}
      </StyledInputsWrapper>

      <StyledExercisesWrapper>
        <StyledExercisesTitle>Упражнения</StyledExercisesTitle>

        {training.exercises.length === 0 && (
          <StyledEmptyText>Не добавлено ни одного упражнения</StyledEmptyText>
        )}

        {training.exercises.length > 0 && (
          <StyledExerciseCardList>
            {training.exercises.map((exercise, index) => (
              <ExerciseCard
                key={exercise.name}
                positionNumber={index + 1}
                title={exercise.name}
                approaches={exercise.approaches}
                onEdit={() =>
                  openModal(
                    <Modal>
                      <AddApproachesFrom exerciseName={exercise.name} />
                    </Modal>,
                  )
                }
              />
            ))}
          </StyledExerciseCardList>
        )}

        <AddButton
          onClick={() =>
            openModal(
              <Modal>
                <AddExerciseForm />
              </Modal>,
            )
          }
        />
      </StyledExercisesWrapper>

      <StyledSaveButton
        type="submit"
        color="accent"
        disabled={isCreateWorkoutReportPending || isUpdateWorkoutReportPending}
      >
        Сохранить тренировку
      </StyledSaveButton>
    </StyledTrainingFrom>
  );
}

const StyledTrainingFrom = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const StyledTitle = styled.h3`
  margin-bottom: 20px;

  color: #0d0d0d;
  font-size: 18px;
  font-weight: 700;
`;

const StyledInputsWrapper = styled.div`
  margin-bottom: 24px;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledExercisesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

const StyledExercisesTitle = styled.div`
  margin-bottom: 16px;

  color: #0d0d0d;
  font-size: 12px;
  font-weight: 400;
  line-height: 100%;
`;

const StyledEmptyText = styled.div`
  color: #797996;
  font-size: 12px;
  line-height: 140%;
  margin-bottom: 24px;
`;

const StyledExerciseCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;

  & > div:not(:last-child) {
    padding-bottom: 16px;
    border-bottom: 1px solid #f0f0f3;
  }
`;

const StyledSaveButton = styled(Button)`
  margin-top: auto;
`;
