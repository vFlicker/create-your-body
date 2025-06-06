import './RecipesPage.css';

import { useCallback, useEffect, useState } from 'react';

import { recipeApiService, useRecipeCategories } from '~/entities/recipe';
import { Profile, useUser } from '~/entities/user';
import breakfast from '~/shared/assets/svg/avocado.svg';
import dessert from '~/shared/assets/svg/croissant.svg';
import dinner from '~/shared/assets/svg/meat.svg';
import recipesSvg from '~/shared/assets/svg/recipes.svg';
import { useUserSession } from '~/shared/store';
import { Loader } from '~/shared/ui/Loader';
import { TitleCard } from '~/shared/ui/TitleCard';

const categoryIcons = {
  Десерты: dessert,
  Завтраки: breakfast,
  'Обеды и ужины': dinner,
};

export function RecipesPage() {
  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(false);

  const { query } = useUserSession();
  const { user } = useUser();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handleRecipeSelect = async (recipe) => {
    setSelectedRecipe(recipe);
    setPage(2);
    setIsLoadingRecipe(true);
    try {
      const response = await recipeApiService.getRecipeDetailsById(
        query,
        recipe.id,
      );
      setSelectedRecipe(response);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    } finally {
      setIsLoadingRecipe(false);
    }
  };

  const handleBack = useCallback(() => {
    if (page === 2) {
      setSelectedRecipe(null);
      setPage(1);
    } else if (page === 1) {
      setSelectedCategory(null);
      setPage(0);
    } else if (page === 0) {
      window.showContent = false;
      window.dispatchEvent(new Event('showContentChange'));
    }
  }, [page]);

  useEffect(() => {
    // Устанавливаем handleBack только если мы не на странице рецептов
    if (page !== 2) {
      window.handleBack = handleBack;
      document.body.setAttribute('data-handle-back', 'true');
    } else {
      window.handleBack = null;
      document.body.removeAttribute('data-handle-back');
    }

    return () => {
      window.handleBack = null;
      document.body.removeAttribute('data-handle-back');
    };
  }, [page]); // Убираем handleBack из зависимостей

  const { recipeCategories, isRecipeCategoriesPending } = useRecipeCategories();

  const fetchCategoryRecipes = async (categoryName, page = 1) => {
    try {
      const response = await recipeApiService.getRecipesByCategory(
        query,
        categoryName,
        page,
      );
      const { data, meta } = response;
      if (page === 1) {
        setRecipes(data);
      } else {
        setRecipes((prev) => [...prev, ...data]);
      }

      setHasMore(page < meta.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching category recipes:', error);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      setCurrentPage(1);
      setRecipes([]);
      fetchCategoryRecipes(selectedCategory.name);
    }
  }, [selectedCategory]);

  const handleLoadMore = () => {
    if (!isLoadingMore && hasMore) {
      setIsLoadingMore(true);
      fetchCategoryRecipes(selectedCategory.name, currentPage + 1).finally(() =>
        setIsLoadingMore(false),
      );
    }
  };

  return (
    <div className="recipesPage">
      <div className="topRecipes">
        <Profile level={user.user_level} photoSrc={user.image} />
        <div className="topRecipesTitle">
          <img src={recipesSvg} alt="logo" />
          <h1>
            Рецепты{selectedCategory?.name ? `: ${selectedCategory.name}` : ''}
          </h1>
        </div>
      </div>
      <div className="botRecipes">
        {isRecipeCategoriesPending ? (
          <Loader />
        ) : (
          <>
            {page === 0 ? (
              <div className="botRecipesContent">
                {recipeCategories
                  ?.sort((a, b) => {
                    const order = ['Завтраки', 'Обеды и ужины', 'Десерты'];
                    return order.indexOf(a.name) - order.indexOf(b.name);
                  })
                  .map((category, index) => (
                    <TitleCard
                      key={index}
                      title={category.name}
                      iconSrc={categoryIcons[category.name]}
                      onClick={() => handleCategorySelect(category)}
                    />
                  ))}
              </div>
            ) : page === 1 ? (
              <div className="categoryContent">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setPage(0);
                  }}
                  className="backBtn"
                  style={{ position: 'unset', width: 'fit-content' }}
                >
                  Назад
                </button>
                <h2 className="categoryTitle">{selectedCategory.name}</h2>
                <div className="categoryRecipes">
                  {recipes.map((recipe) => (
                    <div
                      key={recipe.id}
                      className="recipeItem"
                      onClick={() => handleRecipeSelect(recipe)}
                    >
                      {recipe.title}
                    </div>
                  ))}
                  {isLoadingMore && <Loader />}
                  {hasMore && !isLoadingMore && (
                    <button onClick={handleLoadMore} className="loadMoreBtn">
                      Загрузить еще
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="recipeContent">
                <button
                  onClick={() => {
                    setSelectedRecipe(null);
                    setPage(1);
                  }}
                  className="backBtn"
                  style={{ position: 'unset', width: 'fit-content' }}
                >
                  Назад
                </button>
                {isLoadingRecipe ? (
                  <Loader />
                ) : (
                  <div className="recipeContent">
                    <h2 className="recipeTitle">{selectedRecipe.title}</h2>
                    {selectedRecipe.image && (
                      <img
                        src={selectedRecipe.image.url}
                        alt={selectedRecipe.title}
                        className="recipeImage"
                      />
                    )}
                    <div className="recipeDescription">
                      {selectedRecipe.nutrition && (
                        <div className="nutrition">
                          <h3>Пищевая ценность</h3>
                          {selectedRecipe.nutrition.calories && (
                            <div className="nutritionItem">
                              <p>Калории</p>
                              <span>{selectedRecipe.nutrition.calories}</span>
                            </div>
                          )}
                          {selectedRecipe.nutrition.proteins && (
                            <div className="nutritionItem">
                              <p>Белки</p>
                              <span>{selectedRecipe.nutrition.proteins}</span>
                            </div>
                          )}
                          {selectedRecipe.nutrition.fats && (
                            <div className="nutritionItem">
                              <p>Жиры</p>
                              <span>{selectedRecipe.nutrition.fats}</span>
                            </div>
                          )}
                          {selectedRecipe.nutrition.carbs && (
                            <div className="nutritionItem">
                              <p>Углеводы</p>
                              <span>{selectedRecipe.nutrition.carbs}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {selectedRecipe.ingredients && (
                        <div className="ingredients">
                          <h3>Ингредиенты</h3>
                          {selectedRecipe.ingredients.map(
                            (ingredient, index) => (
                              <div key={index} className="ingredientItem">
                                <p>{ingredient.name}</p>
                                <span>{ingredient.amount}</span>
                              </div>
                            ),
                          )}
                        </div>
                      )}
                      {selectedRecipe.steps && (
                        <div className="steps">
                          <h3>Способ приготовления</h3>
                          {selectedRecipe.steps.map((step, index) => (
                            <div className="step" key={index}>
                              <span>Шаг {index + 1}</span>
                              <p>{step.description}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      <p className="recipeDescriptionText">
                        Приятного аппетита!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
