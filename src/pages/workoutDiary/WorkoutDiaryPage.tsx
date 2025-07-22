import styled from '@emotion/styled';
import { JSX } from 'react';

import { Dialog, Modal, useModalStore } from '~/entities/modal';
import {
  TrainingCard,
  useWorkoutDiaryStore,
  useWorkoutReportsGroupedByDate,
} from '~/entities/workoutDiary';
import { TrainingFrom } from '~/features/workoutDiary/addOrUpdateTraining';
import { RemoveTraining } from '~/features/workoutDiary/removeTraining';
import { AddButton } from '~/shared/ui/molecules/buttons/AddButton';
import { UserPageLayout } from '~/widgets/layouts/UserPageLayout';

export function WorkoutDiaryPage(): JSX.Element {
  const { openModal } = useModalStore();

  const { clearTraining } = useWorkoutDiaryStore();

  const { workoutReports, isWorkoutReportsPending } =
    useWorkoutReportsGroupedByDate();

  if (!workoutReports || isWorkoutReportsPending) {
    return <UserPageLayout isLoading={isWorkoutReportsPending} />;
  }

  const handleUpdateTraining = (id: number) => {
    openModal(
      <Modal onClose={clearTraining}>
        <TrainingFrom type="update" title="Редактировать тренировку" id={id} />
      </Modal>,
    );
  };

  const handleAddTraining = () => {
    openModal(
      <Modal onClose={clearTraining}>
        <TrainingFrom type="create" title="Новая тренировка" />
      </Modal>,
    );
  };

  const handleRepeatTraining = (id: number) => {
    openModal(
      <Modal onClose={clearTraining}>
        <TrainingFrom type="repeat" title="Повторить тренировку" id={id} />
      </Modal>,
    );
  };

  const handleRemoveTraining = (id: number) => {
    openModal(
      <Dialog>
        <RemoveTraining id={id} />
      </Dialog>,
    );
  };

  return (
    <UserPageLayout>
      <StyledWorkoutDiaryPageWrapper>
        <StyledTitle>Дневник тренировок</StyledTitle>

        <StyledTrainingList>
          {workoutReports.map(({ label, trainings }) => (
            <StyledTrainingItem key={label}>
              <StyledSubTitle>{label}</StyledSubTitle>
              <StyledTrainingCardList>
                {trainings.map(({ id, date, exercisesCount, title }) => (
                  <TrainingCard
                    key={id}
                    id={id}
                    title={title}
                    exercisesCount={exercisesCount}
                    date={date}
                    onClick={() => handleUpdateTraining(id)}
                    onRemove={() => handleRemoveTraining(id)}
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
