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

type ProteinScreenProps = {
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
    label: 'Малоподвижный образ жизни, офисная работа',
    color: ChipColor.Normal,
  },
  [BmiRiskLevel.Normal]: {
    label: 'Умеренная активность, поддержание формы',
    color: ChipColor.Normal,
  },
  [BmiRiskLevel.AboveNormal]: {
    label: 'Регулярные тренировки, набор мышц',
    color: ChipColor.Normal,
  },
  [BmiRiskLevel.High]: {
    label: 'Интенсивный спорт, строгая диета',
    color: ChipColor.Normal,
  },
  [BmiRiskLevel.VeryHigh]: {
    label: 'Избыточное потребление!',
    color: ChipColor.Attention,
  },
};

const cardText = [
  {
    riskLevel: BmiRiskLevel.VeryLow,
    valueEmoji: '⚠️',
    description:
      'Крайне низкое потребление белка. Может привести к серьёзной потере мышечной массы, слабости и проблемам с иммунитетом.',
  },
  {
    riskLevel: BmiRiskLevel.Low,
    valueEmoji: '⚠️',
    description:
      'Недостаточно для поддержания мышечной массы. Минимальная рекомендация ВОЗ — 1.2 г/кг для взрослых.',
  },
  {
    riskLevel: BmiRiskLevel.BelowNormal,
    valueEmoji: '🥚',
    description:
      'Подходит для малоподвижных людей без спортивных целей. Достаточно для поддержания базовых функций организма.',
  },
  {
    riskLevel: BmiRiskLevel.Normal,
    valueEmoji: '🥚',
    description:
      'Отлично! Идеально для активных людей и тех, кто хочет поддерживать мышечную массу. Рекомендуется большинству.',
  },
  {
    riskLevel: BmiRiskLevel.AboveNormal,
    valueEmoji: '🥚',
    description:
      'Хорошо для тех, кто активно тренируется. Поможет в восстановлении после тренировок и наборе мышечной массы.',
  },
  {
    riskLevel: BmiRiskLevel.High,
    valueEmoji: '🥚',
    description:
      'Подходит для интенсивно тренирующихся спортсменов и людей на строгой диете. Максимум для роста мышц.',
  },
  {
    riskLevel: BmiRiskLevel.VeryHigh,
    valueEmoji: '⛔',
    description:
      'Более 2.5 г/кг не даёт дополнительных преимуществ и может создать нагрузку на почки. Лучше перераспределить калории.',
  },
];

export function ProteinScreen({
  onNext,
  onBack,
}: ProteinScreenProps): JSX.Element {
  const [proteinValue, setProteinValue] = useState(1);
  const index = Math.min(
    Math.max(
      Math.round(((proteinValue - 0.5) / (2.5 - 0.5)) * 6),
      BmiRiskLevel.VeryLow,
    ),
    BmiRiskLevel.VeryHigh,
  ) as BmiRiskLevel;

  const card = cardText.find((card) => card.riskLevel === index) ?? cardText[0];

  return (
    <StyledActivityScreenWrapper>
      <ScreenHeader
        title="Выберите норму белка"
        subtitle="⚖️ Определяем ваш идеальный баланс БЖУ"
      />

      <StyledMainWrapper>
        <StyledTop>
          <StyledTitle>Белки</StyledTitle>
          <Chip color={activityLevel[index].color}>
            {activityLevel[index].label}
          </Chip>
        </StyledTop>

        <RangeSelect
          min={0.5}
          max={2.5}
          step={0.1}
          labels={[
            { value: 0.5, text: '0,5 г/кг' },
            { value: 1.2, text: '1,2 г/кг', description: 'Минимум' },
            { value: 1.6, text: '1,6 г/кг', description: 'Норма' },
            { value: 2.0, text: '2,0 г/кг', description: 'Спорт' },
            { value: 2.5, text: '2,5 г/кг', description: 'Максимум' },
          ]}
          value={proteinValue}
          onChange={setProteinValue}
        />

        <StatCard
          title={`Ваш уровень белка (${proteinValue} г/кг веса)`}
          description={card.description}
          riskLevel={index}
          value={proteinValue}
          valueEmoji={card.valueEmoji}
          calories={proteinValue}
          percentage={proteinValue}
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

    background-color: #4765fa;
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
