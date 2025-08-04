import styled from '@emotion/styled';
import { JSX } from 'react';

import { useWorkoutDiaryStore } from '~/entities/workoutDiary';
import TrashIcon from '~/shared/assets/svg/trash.svg?react';

type RemoveAllApproachButtonProps = {
  exerciseName: string;
};

export function RemoveAllApproachButton({
  exerciseName,
}: RemoveAllApproachButtonProps): JSX.Element {
  const { removeAllApproaches } = useWorkoutDiaryStore();

  return (
    <StyledRemoveAllApproachButton
      color="accent"
      onClick={() => removeAllApproaches(exerciseName)}
    >
      <TrashIcon />
    </StyledRemoveAllApproachButton>
  );
}

const StyledRemoveAllApproachButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 54px;
  height: 54px;
  border-radius: 50%;

  background-color: #feebeb;
  stroke: #f65c5c;
`;
