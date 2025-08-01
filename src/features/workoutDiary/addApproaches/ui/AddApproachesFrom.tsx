import styled from '@emotion/styled';
import { JSX, useState } from 'react';

import { useModalStore } from '~/entities/modal';
import { useWorkoutDiaryStore } from '~/entities/workoutDiary';
import PlusIcon from '~/shared/assets/svg/plus.svg?react';
import TrashIcon from '~/shared/assets/svg/trash.svg?react';
import { Button } from '~/shared/ui/atoms/Button';
import { Input2 } from '~/shared/ui/molecules/inputs/Input2';

import { useApproachesManagement } from '../addApproachesLib';

type AddApproachesFromProps = {
  exerciseName: string;
};

export function CreateNewApproachesFrom({
  exerciseName,
}: AddApproachesFromProps): JSX.Element {
  const [repetitions, setRepetitions] = useState<number | undefined>(undefined);
  const [weight, setWeight] = useState<number | undefined>(undefined);

  const { createApproach } = useWorkoutDiaryStore();

  const handleCreateApproach = () => {
    if (repetitions !== undefined) {
      createApproach(exerciseName, { repetitions, weight });
      setRepetitions(undefined);
      setWeight(undefined);
    }
  };

  const isAddApproachButtonDisabled = repetitions === undefined;

  return (
    <StyledApproachRow>
      <StyledApproachNumber>-</StyledApproachNumber>

      <StyledInputsWrapper>
        <Input2
          type="number"
          placeholder="Повторения"
          postfix="раз"
          value={repetitions ?? ''}
          onChange={(evt) => {
            const value = evt.target.value;
            setRepetitions(value === '' ? undefined : Number(value));
          }}
        />

        <Input2
          type="number"
          placeholder="Вес снаряда"
          postfix="кг"
          value={weight ?? ''}
          onChange={(evt) => {
            const value = evt.target.value;
            setWeight(value === '' ? undefined : Number(value));
          }}
        />

        <StyledAddApproachButton
          disabled={isAddApproachButtonDisabled}
          onClick={handleCreateApproach}
        >
          <PlusIcon strokeWidth="1.5" />
        </StyledAddApproachButton>
      </StyledInputsWrapper>
    </StyledApproachRow>
  );
}

export function AddApproachesFrom({
  exerciseName,
}: AddApproachesFromProps): JSX.Element {
  const {
    exercise,
    updateApproach,
    // duplicateApproach,
    removeApproach,
  } = useApproachesManagement(exerciseName);

  const { closeModal } = useModalStore();

  const { approaches, name } = exercise;

  const handleSaveClick = () => {
    closeModal();
  };

  return (
    <StyledAddApproachesFromWrapper>
      <StyledTitle>{name}</StyledTitle>

      {approaches.map(({ repetitions, weight }, index) => {
        return (
          <StyledApproachRow key={index}>
            <StyledApproachNumber>{index + 1}</StyledApproachNumber>

            <StyledInputsWrapper>
              <Input2
                type="number"
                placeholder="Повторения"
                postfix="раз"
                value={repetitions}
                onChange={(evt) =>
                  updateApproach(index, 'repetitions', evt.target.value)
                }
              />

              <Input2
                type="number"
                placeholder="Вес снаряда"
                postfix="кг"
                value={weight}
                onChange={(evt) =>
                  updateApproach(index, 'weight', evt.target.value)
                }
              />

              <StyledRemoveApproachButton
                color="accent"
                onClick={() => removeApproach(index)}
              >
                <TrashIcon />
              </StyledRemoveApproachButton>
            </StyledInputsWrapper>
          </StyledApproachRow>
        );
      })}

      <CreateNewApproachesFrom exerciseName={exerciseName} />

      <StyledSaveButton color="accent" onClick={handleSaveClick}>
        Готово
      </StyledSaveButton>
    </StyledAddApproachesFromWrapper>
  );
}

const StyledAddApproachesFromWrapper = styled.div`
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

const StyledApproachRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  margin-bottom: 18px;
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
  grid-template-columns: minmax(118px, 1fr) minmax(118px, 1fr) auto;
  gap: 8px;
`;

const StyledActionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 48px;
  height: 48px;

  border-radius: 8px;

  &:disabled {
    opacity: 0.5;
  }
`;

const StyledAddApproachButton = styled(StyledActionButton)`
  background-color: #7a66ff;
  stroke: #ffffff;
`;

const StyledRemoveApproachButton = styled(StyledActionButton)`
  background-color: #feebeb;
  stroke: #f65c5c;
`;

const StyledSaveButton = styled(Button)`
  margin-top: auto;
`;
