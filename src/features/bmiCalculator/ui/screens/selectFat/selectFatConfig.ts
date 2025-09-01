import { BmiRiskLevel, ChipColor } from '~/entities/bmi';

export const fatRiskLevel = [
  {
    range: [0, 0.5],
    riskLevel: BmiRiskLevel.VeryLow,
    label: 'Критически мало!',
    chipColor: ChipColor.Warning,
    valueEmoji: '⚠️',
    description:
      'Опасно низкое потребление жиров. Серьёзный риск гормональных нарушений и дефицита жирорастворимых витаминов.',
  },
  {
    range: [0.5, 0.7],
    riskLevel: BmiRiskLevel.Low,
    label: 'Ниже минимума',
    chipColor: ChipColor.Warning,
    valueEmoji: '⚠️',
    description:
      'Недостаточно для нормальной выработки гормонов. Может привести к снижению тестостерона и проблемам с кожей.',
  },
  {
    range: [0.7, 0.9],
    riskLevel: BmiRiskLevel.BelowNormal,
    label: 'Строгая диета, минимум для здоровья',
    chipColor: ChipColor.Normal,
    valueEmoji: '🥑',
    description:
      'Минимальная норма. Подходит для строгих диет, но лучше увеличить до 1.0 г/кг для оптимального гормонального баланса.',
  },
  {
    range: [0.9, 1.3],
    riskLevel: BmiRiskLevel.Normal,
    label: 'Сбалансированное питание, оптимум',
    chipColor: ChipColor.Normal,
    valueEmoji: '🥑',
    description:
      'Отлично! Обеспечивает нормальную выработку гормонов, усвоение витаминов и здоровье кожи. Золотая середина.',
  },
  {
    range: [1.3, 1.5],
    riskLevel: BmiRiskLevel.AboveNormal,
    label: 'Любители жирной пищи, набор массы',
    chipColor: ChipColor.Normal,
    valueEmoji: '🥑',
    description:
      'Хорошо для тех, кто предпочитает жирную пищу или набирает массу. Может замедлить похудение из-за калорийности, но безопасно.',
  },
  {
    range: [1.5, Infinity],
    riskLevel: BmiRiskLevel.VeryHigh,
    label: 'Кето-диета, очень высокожировое питание',
    chipColor: ChipColor.Attention,
    valueEmoji: '🥑',
    description:
      'Хорошо для тех, кто предпочитает жирную пищу или набирает массу. Может замедлить похудение из-за калорийности, но безопасно.',
  },
];
