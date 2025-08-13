import styled from '@emotion/styled';
import { JSX } from 'react';

import {
  BmiCard,
  FactBlock,
  ResultCard,
  ScreenHeader,
  useBmiStore,
} from '~/entities/bmi';
import { Color } from '~/shared/theme/colors';
import { Button } from '~/shared/ui/atoms/Button';

type ParametersResultScreenProps = {
  onNext: () => void;
  onBack: () => void;
};

export function ParametersResultScreen({
  onNext,
  onBack,
}: ParametersResultScreenProps): JSX.Element {
  const { form } = useBmiStore();

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
        <StyledTitle>Ваш индекс массы тела (ИМТ)</StyledTitle>
        <BmiCard height={form.height!} weight={form.weight!} />

        <StyledFooter>
          <FactBlock>
            BMR составляет <span>60-75%</span> от общих затрат энергии в сутки.
            Мозг потребляет около <span>20%</span> всей энергии!
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
  flex-grow: 1;

  padding: 16px 16px 24px;
  border-radius: 20px 20px 0 0;

  background-color: ${Color.White};
`;

const StyledTitle = styled.h1`
  margin-bottom: 16px;

  color: #0d0d0d;
  font-size: 16px;
  font-weight: 700;
  line-height: 120%;
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
