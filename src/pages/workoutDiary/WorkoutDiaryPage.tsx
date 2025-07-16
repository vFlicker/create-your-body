import styled from '@emotion/styled';
import { JSX } from 'react';

import { useModalStore } from '~/entities/modal';
import { TrainingCard } from '~/entities/workoutDiary';
import { AddTrainingFrom } from '~/features/workoutDiary/addTraining';
import { AddButton } from '~/shared/ui/molecules/buttons/AddButton';
import { UserPageLayout } from '~/widgets/layouts/UserPageLayout';

import { workoutDiaryPageConfig } from './workoutDiaryPageConfig';

export function WorkoutDiaryPage(): JSX.Element {
  const { openModal } = useModalStore();

  return (
    <UserPageLayout>
      <StyledWorkoutDiaryPageWrapper>
        <StyledTitle>Дневник тренировок</StyledTitle>

        <StyledTrainingList>
          {workoutDiaryPageConfig.map(({ date, trainings }) => (
            <StyledTrainingItem>
              <StyledSubTitle>{date}</StyledSubTitle>
              <StyledTrainingCardList>
                {trainings.map(({ id, title, exercisesCount, date }) => (
                  <TrainingCard
                    key={id}
                    title={title}
                    exercisesCount={exercisesCount}
                    date={date}
                    onRemove={() => {}}
                    onRepeat={() => {}}
                  />
                ))}
              </StyledTrainingCardList>
            </StyledTrainingItem>
          ))}
        </StyledTrainingList>

        <StyledButtonWrapper>
          <AddButton onClick={() => openModal(<AddTrainingFrom />)} />
        </StyledButtonWrapper>
      </StyledWorkoutDiaryPageWrapper>
    </UserPageLayout>
  );
}

const StyledWorkoutDiaryPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 16px;
`;

const StyledTitle = styled.h3`
  color: #0d0d0d;
  font-size: 18px;
  font-weight: 700;
`;

const StyledSubTitle = styled.div`
  color: #8b8b9f;
  font-size: 12px;
  font-weight: 500;
  line-height: 120%;
`;

const StyledTrainingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledTrainingItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledTrainingCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  & > div:not(:last-child) {
    padding-bottom: 12px;
    border-bottom: 1px solid #f0f0f3;
  }
`;

const StyledButtonWrapper = styled.div`
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 120px;
`;
