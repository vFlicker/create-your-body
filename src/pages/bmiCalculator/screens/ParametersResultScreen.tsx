import styled from '@emotion/styled';
import { JSX } from 'react';

import { BmiCard } from '~/entities/bmi';
import { Color } from '~/shared/theme/colors';
import { Button } from '~/shared/ui/atoms/Button';

import { FactBlock } from './ui/FactBlock';
import { ResultCard } from './ui/ResultCard';
import { ScreenHeader } from './ui/ScreenHeader';

type ParametersResultScreenProps = {
  onNext: () => void;
  onBack: () => void;
};

export function ParametersResultScreen({
  onNext,
  onBack,
}: ParametersResultScreenProps): JSX.Element {
  return (
    <StyledParametersResultScreenWrapper>
      <ScreenHeader
        element={
          <ResultCard
            title="Ваш базовый обмен веществ"
            indicator="🔥 1 259 ккал"
            description="Это количество энергии, которое ваше тело тратит в покое (дыхание, работа органов)"
          />
        }
      />

      <StyledMainWrapper>
        <FactBlock>
          BMR составляет <span>60-75%</span> от общих затрат энергии в сутки.
          Мозг потребляет около <span>20%</span> всей энергии!
        </FactBlock>

        <BmiCard height={1.74} weight={64} />

        <StyledActions>
          <Button color="neutral" onClick={onBack}>
            Назад
          </Button>
          <Button color="accent" onClick={onNext}>
            Далее
          </Button>
        </StyledActions>
      </StyledMainWrapper>
    </StyledParametersResultScreenWrapper>
  );
}

const StyledParametersResultScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const StyledMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex-grow: 1;

  padding: 16px 16px 24px;
  border-radius: 20px 20px 0 0;

  background-color: ${Color.White};
`;

const StyledActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;
