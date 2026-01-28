import styled from '@emotion/styled';
import { JSX } from 'react';

import PlusIcon from '~/shared/assets/svg/plus.svg?react';

import { DiaryApproachRow } from './DiaryApproachRow';

type Approach = {
  weight: number;
  reps: number;
};

type DiaryExerciseItemProps = {
  exerciseName: string;
  approaches: Approach[];
  onApproachChange: (
    approachIndex: number,
    field: 'reps' | 'weight',
    value: number,
  ) => void;
  onAddApproach: () => void;
  onRemoveApproach: (approachIndex: number) => void;
};

export function DiaryExerciseItem({
  exerciseName,
  approaches,
  onApproachChange,
  onAddApproach,
  onRemoveApproach,
}: DiaryExerciseItemProps): JSX.Element {
  return (
    <StyledExerciseItem>
      <StyledExerciseName>{exerciseName}</StyledExerciseName>

      <StyledApproachesList>
        {approaches.map((approach, index) => (
          <DiaryApproachRow
            key={index}
            index={index}
            reps={approach.reps}
            weight={approach.weight}
            onChange={(field, value) => onApproachChange(index, field, value)}
            onRemove={() => onRemoveApproach(index)}
            canRemove={approaches.length > 1}
          />
        ))}
      </StyledApproachesList>

      <StyledAddApproachButton onClick={onAddApproach}>
        <PlusIcon />
        Добавить подход
      </StyledAddApproachButton>
    </StyledExerciseItem>
  );
}

const StyledExerciseItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 16px;
  border-radius: 12px;

  background-color: #f8f8f8;
`;

const StyledExerciseName = styled.div`
  color: #0d0d0d;
  font-size: 14px;
  font-weight: 600;
  line-height: 120%;
`;

const StyledApproachesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledAddApproachButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  padding: 12px;
  border-radius: 8px;

  color: #7a66ff;
  font-size: 14px;
  font-weight: 600;

  background-color: #f2f1ff;
  stroke: #7a66ff;

  svg {
    width: 16px;
    height: 16px;
  }
`;
