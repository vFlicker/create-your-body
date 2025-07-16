import styled from '@emotion/styled';
import { JSX } from 'react';

import { useModalStore } from '~/entities/modal';
import { ExerciseCard, useWorkoutDiaryStore } from '~/entities/workoutDiary';
import { Button } from '~/shared/ui/atoms/Button';
import { AddButton } from '~/shared/ui/molecules/buttons/AddButton';
import { Input } from '~/shared/ui/molecules/Input';

import { AddApproachesFrom } from '../../addApproaches';
import { AddExerciseForm } from '../../addExercise';

export function AddTrainingFrom(): JSX.Element {
  const { exercises, name, setTrainingName, clear } = useWorkoutDiaryStore();

  const { openModal } = useModalStore();

  const handleSaveClick = () => {
    clear();
  };

  return (
    <StyledAddTrainingFromWrapper>
      <StyledTitle>Новая тренировка</StyledTitle>

      <StyledInputsWrapper>
        <Input
          label="Название"
          placeholder="Новая тренировка"
          value={name}
          onChange={(evt) => setTrainingName(evt.target.value)}
        />
      </StyledInputsWrapper>

      <StyledLessonsWrapper>
        <StyledLessons>Упражнения</StyledLessons>

        {exercises.length === 0 && (
          <StyledText>Не добавлено ни одного упражнения</StyledText>
        )}

        {exercises.length > 0 && (
          <StyledExerciseCardList>
            {exercises.map((exercise, index) => (
              <ExerciseCard
                key={index}
                positionNumber={index + 1}
                title={exercise.name}
                approaches={exercise.approaches}
                onEdit={() =>
                  openModal(<AddApproachesFrom exerciseName={exercise.name} />)
                }
              />
            ))}
          </StyledExerciseCardList>
        )}

        <AddButton onClick={() => openModal(<AddExerciseForm />)} />
      </StyledLessonsWrapper>

      <StyledSaveButton color="accent" onClick={handleSaveClick} disabled>
        Сохранить тренировку
      </StyledSaveButton>
    </StyledAddTrainingFromWrapper>
  );
}

const StyledAddTrainingFromWrapper = styled.div`
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

const StyledLessonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

const StyledLessons = styled.div`
  margin-bottom: 16px;

  color: #0d0d0d;
  font-size: 12px;
  font-weight: 400;
  line-height: 100%;
`;

const StyledText = styled.div`
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
