import styled from '@emotion/styled';
import { JSX, useEffect, useState } from 'react';

import { useWorkoutDiaryStore } from '~/entities/workoutDiary';
import PlusIcon from '~/shared/assets/svg/plus.svg?react';
import { Input2 } from '~/shared/ui/molecules/inputs/Input2';

import { approachesInputs } from '../addApproachesConfig';

type AddApproachesFormProps = {
  exerciseName: string;
};

export function AddApproachesForm({
  exerciseName,
}: AddApproachesFormProps): JSX.Element {
  const [approach, setApproach] = useState<Record<string, number | undefined>>(
    {},
  );

  const {
    createApproach,
    selectedApproachFromHistory,
    clearSelectedApproachFromHistory,
  } = useWorkoutDiaryStore();

  useEffect(() => {
    if (selectedApproachFromHistory) {
      setApproach({
        repetitions: selectedApproachFromHistory.repetitions,
        weight: selectedApproachFromHistory.weight,
      });
    }
  }, [selectedApproachFromHistory]);

  const handleCreateApproach = () => {
    if (approach.repetitions !== undefined) {
      setApproach({});
      createApproach(exerciseName, approach);
      clearSelectedApproachFromHistory();
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setApproach({ ...approach, [name]: value ? Number(value) : undefined });
  };

  const isAddApproachButtonDisabled = approach.repetitions === undefined;

  return (
    <StyledApproachRow>
      <StyledApproachNumber>-</StyledApproachNumber>

      <StyledInputsWrapper>
        {approachesInputs.map(({ name, ...inputProps }) => (
          <Input2
            key={name}
            {...inputProps}
            value={approach[name] ?? ''}
            onChange={(evt) => handleInputChange(name, evt.target.value)}
          />
        ))}

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
