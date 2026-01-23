import styled from '@emotion/styled';
import { JSX } from 'react';

import { NutritionItem } from '~/entities/recipe';

type Ingredient = {
  id: string;
  name: string;
  amount: string;
};

type Cms2IngredientsBlockProps = {
  ingredients: Ingredient[];
};

export function Cms2IngredientsBlock({
  ingredients,
}: Cms2IngredientsBlockProps): JSX.Element {
  return (
    <StyledIngredientsBlock>
      <StyledTitle>Ингредиенты</StyledTitle>
      <StyledIngredientsList>
        {ingredients.map((ingredient) => (
          <NutritionItem
            key={ingredient.id}
            label={ingredient.name}
            value={ingredient.amount}
          />
        ))}
      </StyledIngredientsList>
    </StyledIngredientsBlock>
  );
}

const StyledIngredientsBlock = styled.div`
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

const StyledIngredientsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
