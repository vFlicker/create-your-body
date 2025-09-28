import { ChipColor } from '../Chip';

export const enum BmiRiskLevel {
  VeryLow = 0,
  Low = 1,
  BelowNormal = 2,
  Normal = 3,
  AboveNormal = 4,
  High = 5,
  VeryHigh = 6,
}

export type RiskLevelConfig = {
  range: [number, number];
  riskLevel: BmiRiskLevel;
  label: string;
  chipColor: ChipColor;
  valueEmoji: string;
  getDescription: (data?: unknown) => string;
}[];
