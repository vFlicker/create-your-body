import styled from '@emotion/styled';
import { JSX, useState } from 'react';

import { FactBlock, ScreenHeader, StatCard } from '~/entities/bmi';
import { Color } from '~/shared/theme/colors';
import { Button } from '~/shared/ui/atoms/Button';
import { RangeSelect } from '~/shared/ui/molecules/RangeSelect';

type ProteinScreenProps = {
  onNext: () => void;
  onBack: () => void;
};

export function ProteinScreen({
  onNext,
  onBack,
}: ProteinScreenProps): JSX.Element {
  const [proteinValue, setProteinValue] = useState(1);

  return (
    <StyledActivityScreenWrapper>
      <ScreenHeader
        title="Выберите норму белка"
        subtitle="⚖️ Определяем ваш идеальный баланс БЖУ"
      />

      <StyledMainWrapper>
        <StatCard />

        <div>value: {proteinValue}</div>

        <RangeSelect
          min={0.5}
          max={2.5}
          step={0.1}
          labels={[
            { value: 0, text: 'Тяни вправо' },
            { value: 1.2, text: '1.2 г/кг', description: 'Минимум' },
            { value: 1.6, text: '1.6 г/кг', description: 'Норма' },
            { value: 2.0, text: '2.0 г/кг', description: 'Спорт' },
            { value: 2.5, text: '2.5 г/кг', description: 'Максимум' },
          ]}
          value={proteinValue}
          onChange={setProteinValue}
        />

        <StyledFooter>
          <FactBlock>
            Белки имеют наибольший термический эффект — на их переваривание
            тратится до 30% калорий!
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
    </StyledActivityScreenWrapper>
  );
}

const StyledActivityScreenWrapper = styled.div`
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
