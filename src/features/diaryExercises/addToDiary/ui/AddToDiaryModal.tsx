import styled from '@emotion/styled';
import { format } from 'date-fns';
import { JSX, useState } from 'react';

import { Modal, useModalStore } from '~/entities/modal';
import { useAddFromProgram, useProgramWorkout } from '~/entities/workoutDiary';
import { showTelegramAlert } from '~/shared/libs/telegram';
import { Button } from '~/shared/ui/atoms/Button';
import { HorizontalDatePicker } from '~/shared/ui/molecules/HorizontalDatePicker';

import { DiaryExerciseItem } from './DiaryExerciseItem';

type Exercise = {
  exerciseId: number;
  exerciseName: string;
  sets: number;
  reps: number;
  weight: number;
};

type Approach = {
  weight: number;
  reps: number;
};

type ExerciseState = {
  exerciseId: number;
  exerciseName: string;
  approaches: Approach[];
};

type AddToDiaryModalProps = {
  exercises: Exercise[];
  productId: number;
  onSuccess: () => void;
};

export function AddToDiaryModal({
  exercises,
  productId,
  onSuccess,
}: AddToDiaryModalProps): JSX.Element {
  const closeAll = useModalStore((store) => store.closeAll);
  const { addFromProgram, isAddFromProgramPending } = useAddFromProgram();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedDate = format(selectedDate, 'yyyy-MM-dd');

  const { programWorkout, isProgramWorkoutPending, refetchProgramWorkout } =
    useProgramWorkout(productId, formattedDate);

  const [exercisesState, setExercisesState] = useState<ExerciseState[]>(() =>
    exercises.map((exercise) => ({
      exerciseId: exercise.exerciseId,
      exerciseName: exercise.exerciseName,
      approaches: Array.from({ length: exercise.sets }, () => ({
        weight: exercise.weight || 0,
        reps: exercise.reps,
      })),
    })),
  );

  const handleApproachChange = (
    exerciseIndex: number,
    approachIndex: number,
    field: 'reps' | 'weight',
    value: number,
  ) => {
    setExercisesState((prev) =>
      prev.map((exercise, eIdx) =>
        eIdx === exerciseIndex
          ? {
              ...exercise,
              approaches: exercise.approaches.map((approach, aIdx) =>
                aIdx === approachIndex
                  ? { ...approach, [field]: value }
                  : approach,
              ),
            }
          : exercise,
      ),
    );
  };

  const handleAddApproach = (exerciseIndex: number) => {
    setExercisesState((prev) =>
      prev.map((exercise, eIdx) =>
        eIdx === exerciseIndex
          ? {
              ...exercise,
              approaches: [...exercise.approaches, { weight: 0, reps: 0 }],
            }
          : exercise,
      ),
    );
  };

  const handleRemoveApproach = (
    exerciseIndex: number,
    approachIndex: number,
  ) => {
    setExercisesState((prev) =>
      prev.map((exercise, eIdx) =>
        eIdx === exerciseIndex
          ? {
              ...exercise,
              approaches: exercise.approaches.filter(
                (_, aIdx) => aIdx !== approachIndex,
              ),
            }
          : exercise,
      ),
    );
  };

  const handleSubmit = async () => {
    try {
      await addFromProgram({
        dto: {
          productId,
          date: formattedDate,
          exercises: exercisesState.map((exercise) => ({
            exerciseId: exercise.exerciseId,
            sets: exercise.approaches.map((approach) => ({
              weight: approach.weight,
              reps: approach.reps,
            })),
          })),
        },
      });

      showTelegramAlert('Упражнения добавлены в дневник');
      onSuccess();
      closeAll();
    } catch {
      showTelegramAlert('Не удалось добавить упражнения');
      refetchProgramWorkout();
    }
  };

  const existingExercises = programWorkout?.exercises ?? [];
  const hasExistingExercises = existingExercises.length > 0;

  return (
    <Modal fullScreen title="Добавить в дневник">
      <StyledModalContent>
        <HorizontalDatePicker
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />

        {isProgramWorkoutPending && (
          <StyledLoadingText>Загрузка...</StyledLoadingText>
        )}

        {!isProgramWorkoutPending && hasExistingExercises && (
          <StyledExistingSection>
            <StyledExistingSectionTitle>
              Уже добавлено на эту дату:
            </StyledExistingSectionTitle>
            <StyledExistingList>
              {existingExercises.map((exercise) => (
                <StyledExistingItem key={exercise.id}>
                  <StyledExistingName>{exercise.name}</StyledExistingName>
                  <StyledExistingApproaches>
                    {exercise.approaches.length} подх.
                  </StyledExistingApproaches>
                </StyledExistingItem>
              ))}
            </StyledExistingList>
          </StyledExistingSection>
        )}

        <StyledExercisesList>
          {exercisesState.map((exercise, exerciseIndex) => (
            <DiaryExerciseItem
              key={exercise.exerciseId}
              exerciseName={exercise.exerciseName}
              approaches={exercise.approaches}
              onApproachChange={(approachIndex, field, value) =>
                handleApproachChange(exerciseIndex, approachIndex, field, value)
              }
              onAddApproach={() => handleAddApproach(exerciseIndex)}
              onRemoveApproach={(approachIndex) =>
                handleRemoveApproach(exerciseIndex, approachIndex)
              }
            />
          ))}
        </StyledExercisesList>

        <StyledButtonWrapper>
          <StyledFadeOverlay />
          <Button
            color="accent"
            onClick={handleSubmit}
            disabled={isAddFromProgramPending}
          >
            {isAddFromProgramPending ? 'Сохранение...' : 'Сохранить в дневник'}
          </Button>
        </StyledButtonWrapper>
      </StyledModalContent>
    </Modal>
  );
}

const StyledModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 100px;
`;

const StyledLoadingText = styled.div`
  color: #8b8b9f;
  font-size: 14px;
  text-align: center;
`;

const StyledExistingSection = styled.div`
  padding: 12px;
  border-radius: 12px;

  background-color: #fff8e6;
`;

const StyledExistingSectionTitle = styled.div`
  margin-bottom: 8px;

  color: #b38600;
  font-size: 12px;
  font-weight: 600;
`;

const StyledExistingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const StyledExistingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledExistingName = styled.div`
  color: #0d0d0d;
  font-size: 13px;
  font-weight: 500;
`;

const StyledExistingApproaches = styled.div`
  color: #8b8b9f;
  font-size: 12px;
`;

const StyledExercisesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  padding: 16px;
  padding-bottom: calc(16px + env(safe-area-inset-bottom));

  background-color: #ffffff;
`;

const StyledFadeOverlay = styled.div`
  position: absolute;
  top: -40px;
  left: 0;
  right: 0;
  height: 40px;

  background: linear-gradient(to bottom, transparent, #ffffff);
  pointer-events: none;
`;
