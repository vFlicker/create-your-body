import styled from '@emotion/styled';
import { JSX, useEffect, useMemo, useState } from 'react';

import { useModalStore } from '~/entities/modal';
import { AddToDiaryModal } from '~/features/diaryExercises';
import { Button } from '~/shared/ui/atoms/Button';

import { useCms2ContentContext } from './Cms2ContentContext';

type Exercise = {
  exerciseId: number;
  exerciseName: string;
  sets: number;
  reps: number;
  weight: number;
};

type Cms2DiaryExercisesBlockProps = {
  exercises: Exercise[];
};

export function Cms2DiaryExercisesBlock({
  exercises,
}: Cms2DiaryExercisesBlockProps): JSX.Element {
  const { productId } = useCms2ContentContext();
  const openModal = useModalStore((store) => store.openModal);
  const [isAdded, setIsAdded] = useState(false);

  const exercisesKey = useMemo(
    () => exercises.map((e) => e.exerciseId).join(','),
    [exercises],
  );

  useEffect(() => {
    setIsAdded(false);
  }, [exercisesKey]);

  const handleClick = () => {
    if (!productId || isAdded) return;

    openModal(
      <AddToDiaryModal
        exercises={exercises}
        productId={productId}
        onSuccess={() => setIsAdded(true)}
      />,
    );
  };

  if (!productId) {
    return <></>;
  }

  return (
    <StyledWrapper>
      <StyledButton
        color="accent"
        variant={isAdded ? 'outlined' : 'filled'}
        onClick={handleClick}
        disabled={isAdded}
      >
        {isAdded
          ? 'Добавлено в дневник'
          : `Добавить упражнения в дневник (${exercises.length})`}
      </StyledButton>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  margin-top: 8px;
`;

const StyledButton = styled(Button)`
  font-size: 14px;
`;
