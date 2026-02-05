import styled from '@emotion/styled';
import { JSX } from 'react';

import { useModalStore } from '~/entities/modal';
import { useWorkoutDiaryStore } from '~/entities/workoutDiary';
import TrashIcon from '~/shared/assets/svg/trash.svg?react';

type RemoveExerciseButtonProps = {
  exerciseName: string;
};

export function RemoveExerciseButton({
  exerciseName,
}: RemoveExerciseButtonProps): JSX.Element {
  const { closeModal } = useModalStore();
  const { removeExercise } = useWorkoutDiaryStore();

  const handleRemove = () => {
    removeExercise(exerciseName);
    closeModal();
  };

  return (
    <StyledRemoveExerciseButton color="accent" onClick={handleRemove}>
      <TrashIcon />
    </StyledRemoveExerciseButton>
  );
}

const StyledRemoveExerciseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 54px;
  height: 54px;
  border-radius: 50%;

  background-color: #feebeb;
  stroke: #f65c5c;
`;
