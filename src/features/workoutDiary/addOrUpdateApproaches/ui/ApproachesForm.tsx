import styled from '@emotion/styled';
import { JSX } from 'react';

import { useModalStore } from '~/entities/modal';
import { useWorkoutDiaryStore } from '~/entities/workoutDiary';
import { Button } from '~/shared/ui/atoms/Button';

import { AddApproachesForm } from './AddApproachesForm';
import { ApproachesHistory } from './ApproachesHistory';
import { RemoveAllApproachButton } from './RemoveAllApproachButton';
import { UpdateApproachForm } from './UpdateApproachForm';

type ApproachesFormProps = {
  exerciseId: number;
  exerciseType: 'cardio' | 'approaches';
  exerciseName: string;
};

export function ApproachesForm({
  exerciseId,
  exerciseType,
  exerciseName,
}: ApproachesFormProps): JSX.Element {
  const { closeModal } = useModalStore();

  const {
    createApproach,
    selectedApproachFromHistory,
    clearSelectedApproachFromHistory,
  } = useWorkoutDiaryStore();

  const createApproachHandler = () => {
    if (
      selectedApproachFromHistory.repetitions !== undefined ||
      selectedApproachFromHistory.minutes !== undefined
    ) {
      createApproach(exerciseName, selectedApproachFromHistory);
      clearSelectedApproachFromHistory();
    }
  };

  const handleSaveClick = () => {
    createApproachHandler();
    closeModal();
  };

  return (
    <StyledAddApproachesFormWrapper>
      <StyledTitle>{exerciseName}</StyledTitle>

      <UpdateApproachForm
        exerciseType={exerciseType}
        exerciseName={exerciseName}
      />
      <AddApproachesForm
        exerciseType={exerciseType}
        exerciseName={exerciseName}
      />
      <StyledApproachesHistory exerciseId={exerciseId} />

      <StyledFooter>
        <RemoveAllApproachButton exerciseName={exerciseName} />
        <StyledSaveButton color="accent" onClick={handleSaveClick}>
          Готово
        </StyledSaveButton>
      </StyledFooter>
    </StyledAddApproachesFormWrapper>
  );
}

const StyledAddApproachesFormWrapper = styled.div`
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

const StyledApproachesHistory = styled(ApproachesHistory)`
  margin-bottom: 24px;
`;

const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: auto;
`;

const StyledSaveButton = styled(Button)`
  width: auto;
  margin-top: auto;
  padding: 0 32px;
`;
