import './FoodPage.css';
import '../communication/CommunicationPage.css';

import { useNavigate } from 'react-router-dom';

import { useNutritionCategories } from '~/entities/nutrition';
import { UserMeta } from '~/entities/user';
import food from '~/shared/assets/nav/food.svg';
import { Loader } from '~/shared/ui/Loader';
import { TitleCard } from '~/shared/ui/TitleCard';

export function FoodCategoriesPage() {
  const navigate = useNavigate();

  const { isNutritionCategoriesPending, nutritionCategories } =
    useNutritionCategories();

  const handleCategoryClick = (id: string) => {
    navigate(`/food/${id}`);
  };

  return (
    <div className="foodPage">
      <div className="topFood">
        <UserMeta />
        <div className="topFoodTitle">
          <img src={food} alt="logo" />
          <h1 style={{ fontSize: '24px' }}>Питание</h1>
        </div>
      </div>
      <div className="botFood">
        <div
          className="content-wrapper-food"
          style={{
            width: isNutritionCategoriesPending ? '100%' : '',
            height: isNutritionCategoriesPending ? '100%' : '',
          }}
        >
          {isNutritionCategoriesPending ? (
            <Loader />
          ) : (
            <div className="foodList">
              {nutritionCategories.data.map(({ iconUrl, id, title }) => (
                <TitleCard
                  key={id}
                  title={title}
                  iconSrc={iconUrl}
                  onClick={() => handleCategoryClick(id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
