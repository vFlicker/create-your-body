import styled from '@emotion/styled';
import { JSX } from 'react';

import { NutritionStep } from '~/entities/recipe';

type Step = {
  id: string;
  text: string;
};

type Cms2CookingStepsBlockProps = {
  steps: Step[];
};

export function Cms2CookingStepsBlock({
  steps,
}: Cms2CookingStepsBlockProps): JSX.Element {
  return (
    <StyledCookingStepsBlock>
      <StyledTitle>Приготовление</StyledTitle>
      <StyledStepsList>
        {steps.map((step, index) => (
          <NutritionStep
            key={step.id}
            step={index + 1}
            description={step.text}
          />
        ))}
      </StyledStepsList>
    </StyledCookingStepsBlock>
  );
}

const StyledCookingStepsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #0d0d0d;
  margin: 0;
`;

const StyledStepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
