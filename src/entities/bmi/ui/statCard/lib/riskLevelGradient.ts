import { BmiRiskLevel } from '../statCardTypes';

export const riskLevelGradient = {
  [BmiRiskLevel.VeryLow]:
    'linear-gradient(108deg, #FF9D3C 6.67%, #FB8EA6 55.35%, #7A66FF 104.03%, #8877FC 201.4%)',
  [BmiRiskLevel.Low]:
    'linear-gradient(105deg, #FFAA3C -26.22%, #FB8EA6 29.46%, #7A66FF 85.14%, #8877FC 196.51%)',
  [BmiRiskLevel.BelowNormal]:
    'linear-gradient(109deg, #FFAA3C -30.74%, #FB8EA6 12.59%, #7A66FF 55.93%, #8877FC 142.6%)',
  [BmiRiskLevel.Normal]:
    'linear-gradient(108deg, #7A66FF 24.52%, #8877FC 74.93%)',
  [BmiRiskLevel.AboveNormal]:
    'linear-gradient(108deg, #7A66FF 24.52%, #8877FC 74.93%)',
  [BmiRiskLevel.High]:
    'linear-gradient(208deg, #FA5858 -17.26%, #7A66FF 67.66%, #8877FC 152.58%)',
  [BmiRiskLevel.VeryHigh]:
    'linear-gradient(197deg, #FA5858 15.4%, #7A66FF 102.1%, #8877FC 188.8%)',
};
