import styled from '@emotion/styled';
import { JSX } from 'react';

import TrashIcon from '~/shared/assets/svg/trash.svg?react';
import { Input2 } from '~/shared/ui/molecules/inputs/Input2';

type DiaryApproachRowProps = {
  index: number;
  reps: number;
  weight: number;
  onChange: (field: 'reps' | 'weight', value: number) => void;
  onRemove: () => void;
  canRemove: boolean;
};

export function DiaryApproachRow({
  index,
  reps,
  weight,
  onChange,
  onRemove,
  canRemove,
}: DiaryApproachRowProps): JSX.Element {
  return (
    <StyledApproachRow>
      <StyledApproachNumber>{index + 1}</StyledApproachNumber>

      <StyledInputsWrapper>
        <Input2
          type="number"
          inputMode="numeric"
          placeholder="Повторения"
          postfix="раз"
          value={reps || ''}
          onChange={(evt) => onChange('reps', Number(evt.target.value) || 0)}
        />

        <Input2
          type="number"
          inputMode="decimal"
          placeholder="Вес"
          postfix="кг"
          value={weight || ''}
          onChange={(evt) => onChange('weight', Number(evt.target.value) || 0)}
        />

        <StyledRemoveButton onClick={onRemove} disabled={!canRemove}>
          <TrashIcon />
        </StyledRemoveButton>
      </StyledInputsWrapper>
    </StyledApproachRow>
  );
}

const StyledApproachRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StyledApproachNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  width: 24px;
  height: 24px;

  color: #82829a;
  font-size: 11px;
  font-weight: 600;
  line-height: 100%;
`;

const StyledInputsWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr) auto;
  gap: 8px;
`;

const StyledRemoveButton = styled.button`
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
