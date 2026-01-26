import styled from '@emotion/styled';
import { JSX } from 'react';

import { NutritionItem } from '~/entities/recipe';

type Cms2NutritionBlockProps = {
  per100g: {
    fats: number;
    carbs: number;
    protein: number;
    calories: number;
  };
};

export function Cms2NutritionBlock({
  per100g,
}: Cms2NutritionBlockProps): JSX.Element {
  return (
    <StyledNutritionBlock>
      <StyledTitle>Пищевая ценность</StyledTitle>
      <StyledNutritionList>
        <NutritionItem label="Калории" value={`${per100g.calories} ккал`} />
        <NutritionItem label="Белки" value={`${per100g.protein} г`} />
        <NutritionItem label="Жиры" value={`${per100g.fats} г`} />
        <NutritionItem label="Углеводы" value={`${per100g.carbs} г`} />
      </StyledNutritionList>
    </StyledNutritionBlock>
  );
}

const StyledNutritionBlock = styled.div`
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

const StyledNutritionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
