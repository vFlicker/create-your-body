import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useRecipesByCategory } from '~/entities/recipe';
import recipesIconSrc from '~/shared/assets/svg/recipes.svg';
import { AppRoute } from '~/shared/router';
import { Button } from '~/shared/ui/Button';
import { Loader } from '~/shared/ui/Loader';
import { CommonPageLayout } from '~/widgets/CommonPageLayout';

export function RecipeCategoryPage(): JSX.Element {
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();

  const {
    recipes,
    isRecipesPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useRecipesByCategory(category);

  const handleRecipeSelect = (id: string) => {
    navigate(`${AppRoute.RecipeCategories}/${category}/${id}`);
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <CommonPageLayout
      title="Рецепты"
      iconSrc={recipesIconSrc}
      isLoading={isRecipesPending}
    >
      <StyledRecipeCategoryWrapper>
        <StyledTitle>{category}</StyledTitle>
        <StyledCategoriesList>
          {recipes.map(({ id, title }) => (
            <StyledRecipeItemButton
              key={id}
              onClick={() => handleRecipeSelect(id)}
            >
              {title}
            </StyledRecipeItemButton>
          ))}
          {isFetchingNextPage && <Loader />}
          {hasNextPage && (
            <Button
              color="secondary"
              disabled={isFetchingNextPage}
              onClick={handleLoadMore}
            >
              Загрузить еще
            </Button>
          )}
        </StyledCategoriesList>
      </StyledRecipeCategoryWrapper>
    </CommonPageLayout>
  );
}

const StyledRecipeCategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
`;

const StyledTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
`;

const StyledCategoriesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledRecipeItemButton = styled.button`
  padding: 16px;
  border: 1px solid #e6e6e6;
  border-radius: 14px;

  text-align: left;
  font-size: 14px;
  font-weight: 400;

  background: #f2f2f2;
`;
