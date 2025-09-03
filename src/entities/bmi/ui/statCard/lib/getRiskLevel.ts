import { RiskLevelConfig } from '../statCardTypes';

export const getRiskLevel = (value: number, config: RiskLevelConfig) => {
  const result = config.find(({ range }) => {
    const [min, max] = range;
    return min <= value && value < max;
  });

  return result ?? config[0];
};
