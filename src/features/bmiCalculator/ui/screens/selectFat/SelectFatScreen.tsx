import styled from '@emotion/styled';
import { JSX, useState } from 'react';

import {
  BmiRiskLevel,
  Chip,
  FactBlock,
  ScreenHeader,
  StatCard,
} from '~/entities/bmi';
import { Color } from '~/shared/theme/colors';
import { Button } from '~/shared/ui/atoms/Button';
import { RangeSelect } from '~/shared/ui/molecules/RangeSelect';

import { activityLevel, cardText } from './selectFatConfig';

type SelectFatScreenProps = {
  onNext: () => void;
  onBack: () => void;
};

export function SelectFatScreen({
  onNext,
  onBack,
}: SelectFatScreenProps): JSX.Element {
  const [fatValue, setFatValue] = useState(0);

  const index = Math.min(
    Math.max(
      Math.round(((fatValue - 0) / (1.5 - 0)) * 6),
      BmiRiskLevel.VeryLow,
    ),
    BmiRiskLevel.Normal,
  ) as BmiRiskLevel;

  const card = cardText.find((card) => card.riskLevel === index) ?? cardText[0];

  return (
    <StyledActivityScreenWrapper>
      <ScreenHeader
        title="Выберите норму жиров"
        subtitle="⚖️ Определяем ваш идеальный баланс БЖУ "
      />

      <StyledMainWrapper>
        <StyledTop>
          <StyledTitle>Жиры</StyledTitle>
          <Chip color={activityLevel[index].color}>
            {activityLevel[index].label}
          </Chip>
        </StyledTop>

        <RangeSelect
          min={0}
          max={1.5}
          step={0.1}
          labels={[
            { value: 0, text: '0 г' },
            { value: 0.7, text: '0,7 г/кг', description: 'Минимум' },
            { value: 1.0, text: '1,0 г/кг', description: 'Норма' },
            { value: 1.3, text: '1,3 г/кг', description: 'Высокий' },
            { value: 1.5, text: '1,5 г/кг', description: 'Максимум' },
          ]}
          value={fatValue}
          onChange={setFatValue}
        />

        <StatCard
          title={`Ваш уровень белка (${fatValue} г/кг веса)`}
          description={card.description}
          riskLevel={index}
          value={fatValue}
          valueEmoji={card.valueEmoji}
          calories={fatValue}
          percentage={fatValue}
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

const StyledTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  color: #0d0d0d;
  font-size: 16px;
  font-weight: 700;
  line-height: 100%;

  &::before {
    content: '';

    display: block;

    width: 8px;
    height: 8px;
    border-radius: 50%;

    background-color: #ffbf2b;
  }
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
