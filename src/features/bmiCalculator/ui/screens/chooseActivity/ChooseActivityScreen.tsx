import styled from '@emotion/styled';
import { JSX } from 'react';

import { ScreenHeader } from '~/entities/bmi';
import { Color } from '~/shared/theme/colors';
import { Button } from '~/shared/ui/atoms/Button';
import { CardSelect } from '~/shared/ui/molecules/CardSelect';

import { useBmiCalculatorStore } from '../../../model/bmiCalculatorStore';
import { chooseActivityRadios } from './chooseActivityConfig';

type ChooseActivityScreenProps = {
  onNext: () => void;
  onBack: () => void;
};

export function ChooseActivityScreen({
  onNext,
  onBack,
}: ChooseActivityScreenProps): JSX.Element {
  const { form, setForm } = useBmiCalculatorStore();

  return (
    <StyledChooseActivityScreenWrapper>
      <ScreenHeader
        title="Укажите вашу активность"
        subtitle="⚡️ Рассчитываем суточную норму"
      />

      <StyledMainWrapper>
        <StyledChooseActivityFormWrapper>
          {chooseActivityRadios.map(({ badge, subtitle, title }) => (
            <CardSelect
              key={badge}
              type="radio"
              name="activity"
              title={title}
              subtitle={subtitle}
              badge={badge.toFixed(2)}
              checked={badge === form.activityCoefficient}
              onChange={() => setForm({ ...form, activityCoefficient: badge })}
            />
          ))}
        </StyledChooseActivityFormWrapper>

        <StyledFooter>
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
    </StyledChooseActivityScreenWrapper>
  );
}

const StyledChooseActivityScreenWrapper = styled.div`
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
