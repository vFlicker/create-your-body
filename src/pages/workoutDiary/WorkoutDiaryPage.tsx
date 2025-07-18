import styled from '@emotion/styled';
import { JSX } from 'react';

import { useModalStore } from '~/entities/modal';
import { TrainingCard } from '~/entities/workoutDiary';
import {
  useRemoveWorkoutReport,
  useWorkoutReports,
} from '~/entities/workoutDiary';
import { AddTrainingFrom } from '~/features/workoutDiary/addTraining';
import { AddButton } from '~/shared/ui/molecules/buttons/AddButton';
import { UserPageLayout } from '~/widgets/layouts/UserPageLayout';

import { workoutDiaryPageConfig } from './workoutDiaryPageConfig';

export function WorkoutDiaryPage(): JSX.Element {
  const { openModal } = useModalStore();

  const { workoutReports, isWorkoutReportsPending } = useWorkoutReports();
  const { removeWorkoutReport } = useRemoveWorkoutReport();

  const handleAddTraining = () => {
    openModal(<AddTrainingFrom />);
  };

  if (!workoutReports || isWorkoutReportsPending) {
    return <UserPageLayout isLoading={isWorkoutReportsPending} />;
  }

  const handleRepeatTraining = (id: number) => {
    const workoutToRepeat = workoutReports.find((workout) => workout.id === id);
    if (workoutToRepeat) {
      openModal(<AddTrainingFrom initialTraining={workoutToRepeat} />);
    }
  };

  return (
    <UserPageLayout>
      <StyledWorkoutDiaryPageWrapper>
        <StyledTitle>Дневник тренировок</StyledTitle>

        <StyledTrainingList>
          {workoutDiaryPageConfig.map(({ date }) => (
            <StyledTrainingItem key={date}>
              <StyledSubTitle>{date}</StyledSubTitle>
              <StyledTrainingCardList>
                {workoutReports.map(({ id, name, exercises, date }) => (
                  <TrainingCard
                    key={id}
                    id={id}
                    title={name}
                    exercisesCount={exercises.length}
                    date={date}
                    onRemove={() => removeWorkoutReport({ dto: { id } })}
                    onRepeat={() => handleRepeatTraining(id)}
                  />
                ))}
              </StyledTrainingCardList>
            </StyledTrainingItem>
          ))}
        </StyledTrainingList>

        <StyledButtonWrapper>
          <AddButton onClick={handleAddTraining} />
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
