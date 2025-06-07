import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { useNutritionCategories } from '~/entities/nutrition';
import foodIconSrc from '~/shared/assets/nav/food.svg';
import { TitleCard } from '~/shared/ui/TitleCard';
import { CommonPageLayout } from '~/widgets/CommonPageLayout';

export function FoodCategoriesPage(): JSX.Element {
  const navigate = useNavigate();

  const { isNutritionCategoriesPending, nutritionCategories } =
    useNutritionCategories();

  const handleCategoryClick = (id: string) => {
    navigate(`/food/${id}`);
  };

  return (
    <CommonPageLayout
      title="Питание"
      iconSrc={foodIconSrc}
      isLoading={isNutritionCategoriesPending}
    >
      <StyledFoodList>
        {nutritionCategories?.map(({ iconUrl, id, title }) => (
          <TitleCard
            key={id}
            title={title}
            iconSrc={iconUrl}
            onClick={() => handleCategoryClick(id)}
          />
        ))}
      </StyledFoodList>
    </CommonPageLayout>
  );
}

const StyledFoodList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;
