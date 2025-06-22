import styled from '@emotion/styled';
import { JSX } from 'react';

type NutritionStepProps = {
  step: number;
  description: string;
};

export function NutritionStep({
  step,
  description,
}: NutritionStepProps): JSX.Element {
  return (
    <StyledNutritionStep>
      <StyledStep>Шаг {step}</StyledStep>
      <StyledDescription>{description}</StyledDescription>
    </StyledNutritionStep>
  );
}

const StyledNutritionStep = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledStep = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #a799ff;
`;

const StyledDescription = styled.div`
  font-size: 14px;
  color: #0d0d0d;
`;
