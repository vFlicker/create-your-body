import styled from '@emotion/styled';
import { JSX } from 'react';

import { FactBlock, ScreenHeader } from '~/entities/bmi';
import { Color } from '~/shared/theme/colors';
import { Button } from '~/shared/ui/atoms/Button';
import { CardSelect } from '~/shared/ui/molecules/CardSelect';

import { useBmiCalculatorStore } from '../../../model/bmiCalculatorStore';
import { chooseGoalRadios } from './chooseGoalConfig';

type ChooseGoalScreenProps = {
  onNext: () => void;
  onBack: () => void;
};

export function ChooseGoalScreen({
  onNext,
  onBack,
}: ChooseGoalScreenProps): JSX.Element {
  const { form, setForm } = useBmiCalculatorStore();

  return (
    <StyledChooseGoalScreenWrapper>
      <ScreenHeader
        title="Выберите вашу цель"
        subtitle="🎯️ Определяем итоговую калорийность рациона"
      />

      <StyledMainWrapper>
        <StyledChooseActivityFormWrapper>
          {chooseGoalRadios.map(({ value, badge, title }) => (
            <CardSelect
              key={badge}
              type="radio"
              name="goal"
              title={title}
              badge={badge}
              checked={value === form.goal}
              onChange={() =>
                setForm({
                  ...form,
                  goal: value,
                  deficitPercent:
                    value === 'deficit' ? 15 : form.deficitPercent,
                })
              }
            />
          ))}
        </StyledChooseActivityFormWrapper>

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
    </StyledChooseGoalScreenWrapper>
  );
}

const StyledChooseGoalScreenWrapper = styled.div`
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

const StyledChooseActivityFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
