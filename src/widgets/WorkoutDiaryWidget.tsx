import styled from '@emotion/styled';
import { JSX } from 'react';

import { TrainingCard } from '~/entities/workoutDiary';
import { ExerciseCard } from '~/entities/workoutDiary/ui/ExerciseCard';
import { Button } from '~/shared/ui/atoms/Button';
import { Radio, RadioGroup } from '~/shared/ui/molecules/radio';

const inputGroup = [
  {
    label: 'На пресс',
    name: 'press',
    options: [
      { label: 'Подъём ног и таза', value: 'press' },
      { label: 'Подъём ног и таза', value: 'legs' },
      { label: 'Подъём ног и таза', value: 'back' },
    ],
  },
  {
    label: 'На ягодицы',
    name: 'glutes',
    options: [
      { label: 'Скручивания на скамье', value: 'glutes' },
      { label: 'Скручивания на скамье', value: 'legs' },
      { label: 'Скручивания на скамье', value: 'back' },
    ],
  },
];

export function WorkoutDiaryWidget(): JSX.Element {
  return (
    <StyledMeasurementsWidget>
      <StyledTitle>Дневник тренировок</StyledTitle>

      <StyledInputGroupList>
        {inputGroup.map(({ label, name, options }) => (
          <RadioGroup key={name} label={label} name={name}>
            {options.map(({ label, value }) => (
              <Radio key={label} label={label} value={value} />
            ))}
          </RadioGroup>
        ))}
      </StyledInputGroupList>

      <StyledExerciseCardList>
        <ExerciseCard
          positionNumber={1}
          title="Подъём ног и таза"
          approaches={[
            { repetitions: 10, weight: 50 },
            { repetitions: 8, weight: 55 },
          ]}
        />
        <ExerciseCard
          positionNumber={2}
          title="Скручивания на скамье"
          description="Добавьте подходы и повторения"
        />
      </StyledExerciseCardList>

      <StyledContentWrapper>
        <StyledListDescription>Последние тренировки</StyledListDescription>
        <StyledTrainingCardList>
          <TrainingCard />
          <TrainingCard />
        </StyledTrainingCardList>
        <Button color="accent" variant="outlined">
          Перейти в дневник
        </Button>
      </StyledContentWrapper>
    </StyledMeasurementsWidget>
  );
}

const StyledMeasurementsWidget = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledTitle = styled.h2`
  color: #0d0d0d;
  font-size: 18px;
  font-weight: 700;
  line-height: 120%;
`;

const StyledInputGroupList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 16px;
  border-radius: 10px;
  border: 1px solid #e2e2ea;
`;

const StyledListDescription = styled.div`
  color: #8b8b9f;
  font-size: 12px;
  font-weight: 500;
  line-height: 120%;
`;

const StyledTrainingCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  & > div:not(:last-child) {
    padding-bottom: 12px;
    border-bottom: 1px solid #f0f0f3;
  }
`;

const StyledExerciseCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  & > div:not(:last-child) {
    padding-bottom: 16px;
    border-bottom: 1px solid #f0f0f3;
  }
`;
