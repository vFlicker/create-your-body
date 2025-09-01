import { BmiRiskLevel, ChipColor } from '~/entities/bmi';

export const activityLevel = {
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

export const cardText = [
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
