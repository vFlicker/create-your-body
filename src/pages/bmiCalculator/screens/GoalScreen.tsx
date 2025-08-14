import styled from '@emotion/styled';
import { JSX } from 'react';

import { FactBlock, ScreenHeader } from '~/entities/bmi';
import { ChooseGoalForm } from '~/features/bmiCalculator/chooseGoal';
import { Color } from '~/shared/theme/colors';
import { Button } from '~/shared/ui/atoms/Button';

type GoalScreenProps = {
  onNext: () => void;
  onBack: () => void;
};

export function GoalScreen({ onNext, onBack }: GoalScreenProps): JSX.Element {
  return (
    <StyledGoalScreenWrapper>
      <ScreenHeader
        title="Выберите вашу цель"
        subtitle="🎯️ Определяем итоговую калорийность рациона"
      />

      <StyledMainWrapper>
        <ChooseGoalForm />

        <StyledFooter>
          <FactBlock>
            <span>10 000</span> шагов сжигают примерно <span>300-400</span>{' '}
            ккал, в зависимости от вашего веса!
          </FactBlock>

          <StyledActions>
            <Button color="neutral" onClick={onBack}>
              Назад
            </Button>
            <Button color="accent" onClick={onNext}>
              Далее
            </Button>
          </StyledActions>
        </StyledFooter>
      </StyledMainWrapper>
    </StyledGoalScreenWrapper>
  );
}

const StyledGoalScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const StyledMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 24px;

  padding: 16px 16px 24px;
  border-radius: 20px 20px 0 0;

  background-color: ${Color.White};
`;

const StyledFooter = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  gap: 20px;
`;

const StyledActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;
