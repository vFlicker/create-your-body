import styled from '@emotion/styled';
import { JSX } from 'react';
import { useParams } from 'react-router-dom';

import {
  NutritionItem,
  NutritionStep,
  useRecipeDetailsById,
} from '~/entities/recipe';
import recipesIconSrc from '~/shared/assets/svg/recipes.svg';
import { Color } from '~/shared/theme/colors';
import { CommonPageLayout } from '~/widgets/layouts/CommonPageLayout';

export function RecipesDetailsPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  const { recipeDetails, isRecipeDetailsPending } = useRecipeDetailsById(id!);

  if (!recipeDetails || isRecipeDetailsPending) {
    return (
      <CommonPageLayout
        title="Рецепты"
        iconSrc={recipesIconSrc}
        isLoading={isRecipeDetailsPending}
      />
    );
  }

  const { title, image, nutrition, ingredients, steps } = recipeDetails;

  return (
    <CommonPageLayout title="Рецепты" iconSrc={recipesIconSrc}>
      {recipeDetails && (
        <StyledRecipePageWrapper>
          <StyledTitle>{title}</StyledTitle>
          <StyledRecipeImage src={image.url} alt={title} />
          <StyledRecipeDetailsWrapper>
            {nutrition && (
              <NutritionItemList>
                <StyledSectionTitle>Пищевая ценность</StyledSectionTitle>

                <NutritionItem label="Калории" value={nutrition.calories} />
                <NutritionItem label="Белки" value={nutrition.proteins} />
                <NutritionItem label="Жиры" value={nutrition.fats} />
                <NutritionItem label="Углеводы" value={nutrition.carbs} />
              </NutritionItemList>
            )}

            {ingredients && (
              <NutritionItemList>
                <StyledSectionTitle>Ингредиенты</StyledSectionTitle>

                {ingredients.map(({ amount, name }) => (
                  <NutritionItem label={name} value={amount} />
                ))}
              </NutritionItemList>
            )}

            {steps && (
              <StepsWrapper>
                <StyledSectionTitle>Способ приготовления</StyledSectionTitle>
                {steps.map(({ description }, index) => (
                  <NutritionStep step={index + 1} description={description} />
                ))}
              </StepsWrapper>
            )}

            <p className="recipeDescriptionText">Приятного аппетита!</p>
          </StyledRecipeDetailsWrapper>
        </StyledRecipePageWrapper>
      )}
    </CommonPageLayout>
  );
}

const StyledRecipePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledTitle = styled.h2`
  font-size: 18px;
  color: #0d0d0d;
`;

const StyledRecipeImage = styled.img`
  width: 100%;
  border-radius: 14px;
  aspect-ratio: 6 / 3;
  object-fit: cover;
  background-color: ${Color.Black_50};
`;

const StyledRecipeDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NutritionItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledSectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: #0d0d0d;
`;

const StepsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
