import styled from '@emotion/styled';
import { JSX } from 'react';

import { useWorkoutDiaryStore } from '~/entities/workoutDiary';
import TrashIcon from '~/shared/assets/svg/trash.svg?react';

type RemoveApproachButtonProps = {
  exerciseName: string;
  index: number;
};

export function RemoveApproachButton({
  exerciseName,
  index,
}: RemoveApproachButtonProps): JSX.Element {
  const { removeApproach } = useWorkoutDiaryStore();

  return (
    <StyledRemoveApproachButton
      color="accent"
      onClick={() => removeApproach(exerciseName, index)}
    >
      <TrashIcon />
    </StyledRemoveApproachButton>
  );
}

const StyledRemoveApproachButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 48px;
  height: 48px;

  border-radius: 8px;

  background-color: #feebeb;
  stroke: #f65c5c;

  &:disabled {
    opacity: 0.5;
  }
`;
