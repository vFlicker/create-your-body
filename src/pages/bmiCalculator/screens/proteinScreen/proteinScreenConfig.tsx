import { BmiRiskLevel, ChipColor } from '~/entities/bmi';

export const proteinRiskLevel = [
  {
    range: [0, 1.0],
    riskLevel: BmiRiskLevel.VeryLow,
    label: 'Критически мало!',
    chipColor: ChipColor.Warning,
    valueEmoji: '⚠️',
    description:
      'Крайне низкое потребление белка. Может привести к серьёзной потере мышечной массы, слабости и проблемам с иммунитетом.',
  },
  {
    range: [1.0, 1.2],
    riskLevel: BmiRiskLevel.Low,
    label: 'Ниже минимума',
    chipColor: ChipColor.Warning,
    valueEmoji: '⚠️',
    description:
      'Недостаточно для поддержания мышечной массы. Минимальная рекомендация ВОЗ — 1.2 г/кг для взрослых.',
  },
  {
    range: [1.2, 1.4],
    riskLevel: BmiRiskLevel.BelowNormal,
    label: 'Малоподвижный образ жизни, офисная работа',
    chipColor: ChipColor.Normal,
    valueEmoji: '🥚',
    description:
      'Подходит для малоподвижных людей без спортивных целей. Достаточно для поддержания базовых функций организма.',
  },
  {
    range: [1.4, 1.8],
    riskLevel: BmiRiskLevel.Normal,
    label: 'Умеренная активность, поддержание формы',
    chipColor: ChipColor.Normal,
    valueEmoji: '🥚',
    description:
      'Отлично! Идеально для активных людей и тех, кто хочет поддерживать мышечную массу. Рекомендуется большинству.',
  },
  {
    range: [1.8, 2.2],
    riskLevel: BmiRiskLevel.AboveNormal,
    label: 'Регулярные тренировки, набор мышц',
    chipColor: ChipColor.Normal,
    valueEmoji: '🥚',
    description:
      'Хорошо для тех, кто активно тренируется. Поможет в восстановлении после тренировок и наборе мышечной массы.',
  },
  {
    range: [2.2, 2.5],
    riskLevel: BmiRiskLevel.High,
    label: 'Интенсивный спорт, строгая диета',
    chipColor: ChipColor.Normal,
    valueEmoji: '🥚',
    description:
      'Подходит для интенсивно тренирующихся спортсменов и людей на строгой диете. Максимум для роста мышц.',
  },
  {
    range: [2.5, Infinity],
    riskLevel: BmiRiskLevel.VeryHigh,
    label: 'Избыточное потребление!',
    chipColor: ChipColor.Attention,
    valueEmoji: '⛔',
    description:
      'Более 2.5 г/кг не даёт дополнительных преимуществ и может создать нагрузку на почки. Лучше перераспределить калории.',
  },
];
