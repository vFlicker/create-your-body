import styled from '@emotion/styled';
import { JSX, useState } from 'react';

import {
  BmiRiskLevel,
  Chip,
  ChipColor,
  FactBlock,
  ScreenHeader,
  StatCard,
} from '~/entities/bmi';
import { Color } from '~/shared/theme/colors';
import { Button } from '~/shared/ui/atoms/Button';
import { RangeSelect } from '~/shared/ui/molecules/RangeSelect';

type FatScreenProps = {
  onNext: () => void;
  onBack: () => void;
};

const activityLevel = {
  [BmiRiskLevel.VeryLow]: {
    label: 'Критически мало!',
    color: ChipColor.Warning,
  },
  [BmiRiskLevel.Low]: { label: 'Ниже минимума', color: ChipColor.Warning },
  [BmiRiskLevel.BelowNormal]: {
    label: 'Ниже минимума',
    color: ChipColor.Warning,
  },
  [BmiRiskLevel.Normal]: {
    label: 'Строгая диета, минимум для здоровья',
    color: ChipColor.Normal,
  },
  [BmiRiskLevel.AboveNormal]: {
    label: 'Сбалансированное питание, оптимум',
    color: ChipColor.Normal,
  },
  [BmiRiskLevel.High]: {
    label: 'Любители жирной пищи, набор массы',
    color: ChipColor.Normal,
  },
  [BmiRiskLevel.VeryHigh]: {
    label: 'Кето-диета, очень высокожировое питание',
    color: ChipColor.Attention,
  },
};

const cardText = [
  {
    riskLevel: BmiRiskLevel.VeryLow,
    valueEmoji: '⚠️',
    description:
      'Опасно низкое потребление жиров. Серьёзный риск гормональных нарушений и дефицита жирорастворимых витаминов.',
  },
  {
    riskLevel: BmiRiskLevel.Low,
    valueEmoji: '⚠️',
    description:
      'Недостаточно для нормальной выработки гормонов. Может привести к снижению тестостерона и проблемам с кожей.',
  },
  {
    riskLevel: BmiRiskLevel.BelowNormal,
    valueEmoji: '🥑',
    description:
      'Минимальная норма. Подходит для строгих диет, но лучше увеличить до 1.0 г/кг для оптимального гормонального баланса.',
  },
  {
    riskLevel: BmiRiskLevel.Normal,
    valueEmoji: '🥑',
    description:
      'Отлично! Обеспечивает нормальную выработку гормонов, усвоение витаминов и здоровье кожи. Золотая середина.',
  },
  {
    riskLevel: BmiRiskLevel.Normal,
    valueEmoji: '🥑',
    description:
      'Хорошо для тех, кто предпочитает жирную пищу или набирает массу. Может замедлить похудение из-за калорийности, но безопасно.',
  },
];

export function FatScreen({ onNext, onBack }: FatScreenProps): JSX.Element {
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
