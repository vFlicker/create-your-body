import styled from '@emotion/styled';
import { JSX } from 'react';

import { useModalStore } from '~/entities/modal';
import { useExercises } from '~/entities/workoutDiary/api/useExercises';
import PlusIcon from '~/shared/assets/svg/plus.svg?react';
import { Color } from '~/shared/theme/colors';
import { Button } from '~/shared/ui/atoms/Button';
import { Loader } from '~/shared/ui/atoms/Loader';
import { Input } from '~/shared/ui/molecules/Input';
import { Radio, RadioGroup } from '~/shared/ui/molecules/radio';

import { useExerciseSelection } from '../addExerciseLib';

export function AddExerciseForm(): JSX.Element {
  const { toggleExercise, isExerciseSelected, selectedExercisesCount } =
    useExerciseSelection();

  const { closeModal } = useModalStore();

  const { exercises, isExercisesPending } = useExercises();

  if (!exercises || isExercisesPending) {
    return <Loader />;
  }

  const handleSaveClick = () => {
    closeModal();
  };

  return (
    <StyledAddExerciseForm>
      <StyledTitle>Добавить упражнения</StyledTitle>
      <StyledInput label="Выберите упражнения" placeholder="Поиск" />

      <StyledInputGroupList>
        {exercises.map(({ label, name, options }) => (
          <RadioGroup key={name} label={label} name={name}>
            {options.map(({ value }) => (
              <Radio
                key={value}
                label={value}
                value={value}
                type="checkbox"
                checked={isExerciseSelected(value)}
                onChange={() => toggleExercise(value)}
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
          disabled={selectedExercisesCount === 0}
          onClick={handleSaveClick}
        >
          Добавить упражнения ({selectedExercisesCount})
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
