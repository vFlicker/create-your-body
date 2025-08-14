import styled from '@emotion/styled';
import { JSX } from 'react';

import { ScreenHeader } from '~/entities/bmi';
import { ChooseActivityForm } from '~/features/bmiCalculator/chooseActivity';
import { Color } from '~/shared/theme/colors';
import { Button } from '~/shared/ui/atoms/Button';

type ActivityScreenScreenProps = {
  onNext: () => void;
  onBack: () => void;
};

export function ActivityScreenScreen({
  onNext,
  onBack,
}: ActivityScreenScreenProps): JSX.Element {
  return (
    <StyledActivityScreenScreenWrapper>
      <ScreenHeader
        title="Укажите вашу активность"
        subtitle="⚡️ Рассчитываем суточную норму"
      />

      <StyledMainWrapper>
        <ChooseActivityForm />

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
    </StyledActivityScreenScreenWrapper>
  );
}

const StyledActivityScreenScreenWrapper = styled.div`
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
