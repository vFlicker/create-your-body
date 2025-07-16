import styled from '@emotion/styled';
import { JSX } from 'react';

import { useModalStore } from '~/entities/modal';
import { useWorkoutDiaryStore } from '~/entities/workoutDiary';
import PlusIcon from '~/shared/assets/svg/plus.svg?react';
import { Color } from '~/shared/theme/colors';
import { Button } from '~/shared/ui/atoms/Button';
import { Input } from '~/shared/ui/molecules/Input';
import { Radio, RadioGroup } from '~/shared/ui/molecules/radio';

import { inputGroup } from '../addExerciseConfig';

export function AddExerciseForm(): JSX.Element {
  const { exercises, updateExercises } = useWorkoutDiaryStore();
  const { closeModal } = useModalStore();

  return (
    <StyledAddExerciseForm>
      <StyledTitle>Добавить упражнения</StyledTitle>
      <StyledInput label="Выберите упражнения" placeholder="Поиск" />

      <StyledInputGroupList>
        {inputGroup.map(({ label, name, options }) => (
          <RadioGroup key={name} label={label} name={name}>
            {options.map(({ value }) => (
              <Radio
                key={value}
                label={value}
                value={value}
                type="checkbox"
                checked={exercises.some(({ name: title }) => title === value)}
                onChange={() => updateExercises(value)}
              />
            ))}
          </RadioGroup>
        ))}
      </StyledInputGroupList>

      <StyledButtonWrapper>
        <StyledSaveButton
          color="accent"
          variant="filled"
          iconComponent={<PlusIcon stroke="#ffffff" />}
          disabled={exercises.length === 0}
          onClick={() => closeModal()}
        >
          Добавить упражнения ({exercises.length})
        </StyledSaveButton>
      </StyledButtonWrapper>
    </StyledAddExerciseForm>
  );
}

const StyledAddExerciseForm = styled.div``;

const StyledTitle = styled.h3`
  margin-bottom: 20px;

  color: #0d0d0d;
  font-size: 18px;
  font-weight: 700;
`;

const StyledInput = styled(Input)`
  margin-bottom: 24px;
`;

const StyledInputGroupList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 100px;
`;

const StyledButtonWrapper = styled.div`
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 40px;
`;

const StyledSaveButton = styled(Button)`
  &:disabled {
    color: ${Color.Black_50};
    background-color: #dcd6ff;
  }
`;
