import styled from '@emotion/styled';
import { JSX } from 'react';

import { useModalStore } from '~/entities/modal';
import { useWorkoutDiaryStore } from '~/entities/workoutDiary';
import { Exercise } from '~/entities/workoutDiary/model/workoutDiaryStore';
import PlusIcon from '~/shared/assets/svg/plus.svg?react';
import { Button } from '~/shared/ui/atoms/Button';
import { AddButton } from '~/shared/ui/molecules/buttons/AddButton';
import { RemoveButton } from '~/shared/ui/molecules/buttons/RemoveButton';
import { Input } from '~/shared/ui/molecules/Input';

type AddApproachesFromProps = {
  positionIndex?: number;
  exerciseName: string;
};

export function AddApproachesFrom({
  exerciseName,
}: AddApproachesFromProps): JSX.Element {
  const {
    exercises,
    createApproach,
    updateApproach,
    duplicateApproach,
    removeApproach,
  } = useWorkoutDiaryStore();

  const { closeModal } = useModalStore();

  const { approaches, name } = exercises.find(
    (exercises) => exercises.name === exerciseName,
  ) as Exercise;

  return (
    <StyledAddApproachesFromWrapper>
      <StyledTitle>{name}</StyledTitle>
      <StyledSubTitle>Подходы и повторения</StyledSubTitle>

      {approaches.map(({ repetitions, weight }, index) => (
        <StyledApproachRow key={index}>
          <StyledHeader>
            <StyledApproachNumber>{index + 1}</StyledApproachNumber>

            <StyledActions>
              <StyledDuplicateButton
                onClick={() => duplicateApproach(exerciseName, index)}
              >
                Дублировать <PlusIcon strokeWidth="1.5" />
              </StyledDuplicateButton>
              <RemoveButton
                onClick={() => removeApproach(exerciseName, index)}
              />
            </StyledActions>
          </StyledHeader>

          <StyledFooter>
            <Input
              type="number"
              label="Повторения"
              value={repetitions}
              onChange={(evt) =>
                updateApproach(exerciseName, index, {
                  repetitions: Number(evt.target.value),
                })
              }
            />
            <Input
              type="number"
              label="Вес снаряда"
              value={weight}
              onChange={(evt) =>
                updateApproach(exerciseName, index, {
                  weight: Number(evt.target.value),
                })
              }
            />
          </StyledFooter>
        </StyledApproachRow>
      ))}

      <StyledAddButton onClick={() => createApproach(exerciseName)} />

      <StyledSavedButton color="accent" onClick={closeModal}>
        Сохранить
      </StyledSavedButton>
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

const StyledSubTitle = styled.div`
  margin-bottom: 16px;

  color: #0d0d0d;
  font-size: 12px;
  font-weight: 400;
  line-height: 100%;
`;

const StyledApproachRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  margin-bottom: 18px;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

const StyledApproachNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border-radius: 52px;

  color: #7a66ff;
  font-size: 14px;
  font-weight: 600;
  line-height: 100%;

  border: 1px solid #7a66ff;
`;

const StyledActions = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledDuplicateButton = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  padding: 6px 10px;
  border-radius: 6px;
  background: #f0f0f6;

  color: #867ebd;
  font-size: 11px;
  font-weight: 600;
  line-height: 120%;

  stroke: #867ebd;
`;

const StyledFooter = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(150px, 1fr));
  gap: 16px;
`;

const StyledAddButton = styled(AddButton)`
  margin-bottom: 24px;
`;

const StyledSavedButton = styled(Button)`
  margin-top: auto;
`;
