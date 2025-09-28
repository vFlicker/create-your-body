import { ChipColor } from '../../Chip';
import { BmiRiskLevel, RiskLevelConfig } from '../statCardTypes';

export const carbsRiskLevelConfig: RiskLevelConfig = [
  {
    range: [0, 30],
    riskLevel: BmiRiskLevel.VeryLow,
    label: 'Кетогенный режим',
    chipColor: ChipColor.Warning,
    valueEmoji: '⚠️',
    getDescription: () =>
      'Экстремально низкое потребление углеводов. Подходит для кето-диеты, но требует медицинского наблюдения и адаптации.',
  },
  {
    range: [30, 50],
    riskLevel: BmiRiskLevel.Low,
    label: 'Очень низкоуглеводный',
    chipColor: ChipColor.Warning,
    valueEmoji: '⚠️',
    getDescription: () =>
      'Может быть эффективно для быстрого похудения, но следите за уровнем энергии. Мозгу нужно ~120г глюкозы в день.',
  },
  {
    range: [50, 100],
    riskLevel: BmiRiskLevel.BelowNormal,
    label: 'Низкоуглеводный режим',
    chipColor: ChipColor.Normal,
    valueEmoji: '🍞',
    getDescription: () =>
      'Умеренно низкие углеводы. Хорошо для похудения, но может влиять на интенсивность тренировок и концентрацию.',
  },
  {
    range: [100, 200],
    riskLevel: BmiRiskLevel.BelowNormal,
    label: 'Умеренное потребление',
    chipColor: ChipColor.Normal,
    valueEmoji: '🍞',
    getDescription: () =>
      'Сбалансированное количество углеводов. Обеспечивает энергию для мозга и тренировок без избытка.',
  },
  {
    range: [200, 300],
    riskLevel: BmiRiskLevel.Normal,
    label: 'Достаточное потребление',
    chipColor: ChipColor.Normal,
    valueEmoji: '🍞',
    getDescription: () =>
      'Отлично! Хорошее количество для активных людей. Обеспечивает энергию для интенсивных тренировок и восстановления.',
  },
  {
    range: [300, 400],
    riskLevel: BmiRiskLevel.BelowNormal,
    label: 'Высокое потребление',
    chipColor: ChipColor.Normal,
    valueEmoji: '🍞',
    getDescription: () =>
      'Подходит для очень активных людей, спортсменов на наборе массы или тех, кто много тренируется на выносливость.',
  },
  {
    range: [400, 500],
    riskLevel: BmiRiskLevel.High,
    label: 'Очень высокое потребление',
    chipColor: ChipColor.Attention,
    valueEmoji: '⛔',
    getDescription: () =>
      'Большое количество углеводов. Риск набора жира при недостатке активности, возможны скачки сахара в крови и энергетические качели.',
  },
  {
    range: [500, Infinity],
    riskLevel: BmiRiskLevel.VeryHigh,
    label: 'Критический избыток',
    chipColor: ChipColor.Attention,
    valueEmoji: '⛔',
    getDescription: () =>
      'Экстремально много углеводов! Риск: быстрый набор жировой массы, инсулинорезистентность, постоянные скачки энергии, ухудшение композиции тела, проблемы с контролем аппетита.',
  },
];
