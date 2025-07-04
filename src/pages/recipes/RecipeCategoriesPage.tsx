import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRecipeCategories } from '~/entities/recipe';
import breakfastIconSrc from '~/shared/assets/svg/avocado.svg';
import dessertIconSrc from '~/shared/assets/svg/croissant.svg';
import dinnerIconSrc from '~/shared/assets/svg/meat.svg';
import recipesIconSrc from '~/shared/assets/svg/recipes.svg';
import { AppRoute } from '~/shared/router';
import { TitleCard } from '~/shared/ui/molecules/TitleCard';
import { CommonPageLayout } from '~/widgets/CommonPageLayout';

const CATEGORY_ORDER = ['Завтраки', 'Обеды и ужины', 'Десерты'];

const categoryIcon = {
  Завтраки: breakfastIconSrc,
  'Обеды и ужины': dinnerIconSrc,
  Десерты: dessertIconSrc,
};

const orderedCategory = new Map(
  CATEGORY_ORDER.map((name, index) => [name, index]),
);

export function RecipeCategoriesPage(): JSX.Element {
  const navigate = useNavigate();

  const { recipeCategories, isRecipeCategoriesPending } = useRecipeCategories();

  const handleCategoryClick = (category: string) => {
    navigate(`${AppRoute.RecipeCategories}/${category}`);
  };

  const sortedCategories = recipeCategories?.toSorted((a, b) => {
    const orderA = orderedCategory.get(a.name) ?? Infinity;
    const orderB = orderedCategory.get(b.name) ?? Infinity;
    return orderA - orderB;
  });

  return (
    <CommonPageLayout
      title="Рецепты"
      iconSrc={recipesIconSrc}
      isLoading={isRecipeCategoriesPending}
    >
      <StyledRecipeList>
        {sortedCategories?.map(({ name }) => (
          <TitleCard
            key={name}
            title={name}
            iconSrc={categoryIcon[name as keyof typeof categoryIcon]}
            onClick={() => handleCategoryClick(name)}
          />
        ))}
      </StyledRecipeList>
    </CommonPageLayout>
  );
}

const StyledRecipeList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;
