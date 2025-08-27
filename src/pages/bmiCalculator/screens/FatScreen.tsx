import styled from '@emotion/styled';
import { JSX, useState } from 'react';

import { FactBlock, ScreenHeader, StatCard } from '~/entities/bmi';
import { Color } from '~/shared/theme/colors';
import { Button } from '~/shared/ui/atoms/Button';
import { RangeSelect } from '~/shared/ui/molecules/RangeSelect';

type FatScreenProps = {
  onNext: () => void;
  onBack: () => void;
};

export function FatScreen({ onNext, onBack }: FatScreenProps): JSX.Element {
  const [fatValue, setFatValue] = useState(0);

  return (
    <StyledActivityScreenWrapper>
      <ScreenHeader
        title="Выберите норму жиров"
        subtitle="⚖️ Определяем ваш идеальный баланс БЖУ "
      />

      <StyledMainWrapper>
        <StatCard />

        <div>value: {fatValue}</div>

        <RangeSelect
          min={0}
          max={1.5}
          step={0.1}
          labels={[
            { value: 0, text: '0 г' },
            { value: 0.7, text: '0,7 г/кг', description: 'Минимум' },
            { value: 1.0, text: '1,0 г/кг', description: 'Норма' },
            { value: 1.4, text: '1,4 г/кг', description: 'Высокий' },
            { value: 1.5, text: '1,5 г/кг', description: 'Максимум' },
          ]}
          value={fatValue}
          onChange={setFatValue}
        />

        <StyledFooter>
          <FactBlock>
            Холестерин из жиров — предшественник тестостерона. Недостаток жира
            снижает либидо.
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
