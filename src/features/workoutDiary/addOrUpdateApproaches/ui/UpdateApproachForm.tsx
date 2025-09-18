import styled from '@emotion/styled';
import { JSX } from 'react';

import { useWorkoutDiaryStore } from '~/entities/workoutDiary';
import { Input2 } from '~/shared/ui/molecules/inputs/Input2';

import { approachesInputs } from '../addApproachesConfig';
import { RemoveApproachButton } from './RemoveApproachButton';

type UpdateApproachFormProps = {
  exerciseType: 'cardio' | 'approaches';
  exerciseName: string;
};

export function UpdateApproachForm({
  exerciseType,
  exerciseName,
}: UpdateApproachFormProps): JSX.Element {
  const { getExerciseByName, updateApproach } = useWorkoutDiaryStore();

  const handleUpdateApproach = (
    approachIndex: number,
    field: 'repetitions' | 'weight' | 'minutes',
    value: string,
  ) => {
    const numericValue = Number(value) || 0;
    updateApproach(exerciseName, approachIndex, {
      [field]: numericValue,
    });
  };

  const { approaches } = getExerciseByName(exerciseName);

  return (
    <>
      {approaches.map((approach, index) => {
        return (
          <StyledApproachRow key={index}>
            <StyledApproachNumber>{index + 1}</StyledApproachNumber>

            <StyledInputsWrapper>
              {approachesInputs[exerciseType].map(({ name, ...inputProps }) => (
                <Input2
                  key={name}
                  {...inputProps}
                  value={approach[name] ?? ''}
                  onChange={(evt) =>
                    handleUpdateApproach(index, name, evt.target.value)
                  }
                />
              ))}

              <RemoveApproachButton exerciseName={exerciseName} index={index} />
            </StyledInputsWrapper>
          </StyledApproachRow>
        );
      })}
    </>
  );
}

const StyledApproachRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

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
  grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr) auto;
  gap: 8px;
`;
