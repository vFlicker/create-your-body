import styled from '@emotion/styled';
import { JSX } from 'react';

import { useModalStore } from '~/entities/modal';
import { Button } from '~/shared/ui/atoms/Button';

import { AddApproachesForm } from './AddApproachesForm';
import { UpdateApproachForm } from './UpdateApproachForm';

type ApproachesFormProps = {
  exerciseName: string;
};

export function ApproachesForm({
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

      <StyledSaveButton color="accent" onClick={handleSaveClick}>
        Готово
      </StyledSaveButton>
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

const StyledSaveButton = styled(Button)`
  margin-top: auto;
`;
