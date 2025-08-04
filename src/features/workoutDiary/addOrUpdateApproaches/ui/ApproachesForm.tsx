import styled from '@emotion/styled';
import { JSX } from 'react';

import { useModalStore } from '~/entities/modal';
import { Button } from '~/shared/ui/atoms/Button';

import { AddApproachesForm } from './AddApproachesForm';
import { ApproachesHistory } from './ApproachesHistory';
import { RemoveAllApproachButton } from './RemoveAllApproachButton';
import { UpdateApproachForm } from './UpdateApproachForm';

type ApproachesFormProps = {
  exerciseId: number;
  exerciseName: string;
};

export function ApproachesForm({
  exerciseId,
  exerciseName,
}: ApproachesFormProps): JSX.Element {
  const { closeModal } = useModalStore();

  const handleSaveClick = () => {
    closeModal();
  };

  return (
    <StyledAddApproachesFormWrapper>
      <StyledTitle>{exerciseName}</StyledTitle>

      <UpdateApproachForm exerciseName={exerciseName} />
      <AddApproachesForm exerciseName={exerciseName} />
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
