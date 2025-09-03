import { ChipColor } from '../../Chip';
import { BmiRiskLevel, RiskLevelConfig } from '../statCardTypes';

export const caloriesRiskLevelConfig: RiskLevelConfig = [
  {
    range: [-Infinity, -20],
    riskLevel: BmiRiskLevel.VeryLow,
    label: 'Слишком низкая калорийность',
    chipColor: ChipColor.Attention,
    valueEmoji: '⛔',
    getDescription: (diff) =>
      `На ${Math.abs(Math.round(diff as number))} ккал ниже цели. Риск замедления метаболизма, потери мышечной массы и срывов в питании.`,
  },
  {
    range: [-20, -10],
    riskLevel: BmiRiskLevel.Low,
    label: 'Ниже целевой калорийности',
    chipColor: ChipColor.Warning,
    valueEmoji: '⚠️',
    getDescription: (diff) =>
      `На ${Math.abs(Math.round(diff as number))} ккал ниже цели. Может ускорить похудение, но следите за самочувствием и энергией.`,
  },
  {
    range: [-10, 10],
    riskLevel: BmiRiskLevel.Normal,
    label: 'Точно в цели',
    chipColor: ChipColor.Normal,
    valueEmoji: '✅',
    getDescription: (goal) =>
      `Отлично! Калорийность соответствует вашей цели (${goal === 'deficit' ? 'дефицит для похудения' : goal === 'surplus' ? 'избыток для набора массы' : 'поддержание веса'}).`,
  },
  {
    range: [10, 20],
    riskLevel: BmiRiskLevel.High,
    label: 'Выше целевой калорийности',
    chipColor: ChipColor.Warning,
    valueEmoji: '⚠️',
    getDescription: (diff) =>
      `На ${Math.abs(Math.round(diff as number))} ккал выше цели. Может замедлить похудение, но следите за самочувствием и энергией.`,
  },
  {
    range: [20.1, Infinity],
    riskLevel: BmiRiskLevel.VeryHigh,
    label: 'Сильно выше целевой калорийности',
    chipColor: ChipColor.Attention,
    valueEmoji: '⛔',
    getDescription: (diff) =>
      `На ${Math.abs(Math.round(diff as number))} ккал выше цели. Риск набора веса и ухудшения самочувствия.`,
  },
];
