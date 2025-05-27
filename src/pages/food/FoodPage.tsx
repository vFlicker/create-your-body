import './FoodPage.css';
import '../communication/CommunicationPage.css';

import { useEffect, useState } from 'react';

import { useNutritionCategories, useNutritionPlan } from '~/entities/nutrition';
import { Profile } from '~/entities/user';
import food from '~/shared/assets/nav/food.svg';
import { Loader } from '~/shared/ui/Loader';
import { PdfViewer } from '~/shared/ui/pdfViewer';
import { TitleCard } from '~/shared/ui/TitleCard';

export function FoodPage({ data, userId, userQuery }) {
  const [selectedPdfId, setSelectedPdfId] = useState(null);

  const { isNutritionCategoriesPending, nutritionCategories } =
    useNutritionCategories(userQuery);

  const { isNutritionPlanLoading, nutritionPlan } = useNutritionPlan(
    userQuery,
    userId,
    selectedPdfId,
  );

  const handleBack = () => {
    setSelectedPdfId(null);
  };

  useEffect(() => {
    if (selectedPdfId) {
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
  }, [selectedPdfId]);

  return (
    <div className="foodPage">
      <div className="topFood">
        <Profile level={data?.user_level} photoSrc={data?.image} />
        <div className="topFoodTitle">
          <img src={food} alt="logo" />
          <h1 style={{ fontSize: '24px' }}>Питание</h1>
        </div>
      </div>
      <div className="botFood">
        <div
          className={`content-wrapper-food ${selectedPdfId ? 'slide-left' : ''}`}
          style={{
            width: isNutritionCategoriesPending ? '100%' : '',
            height: isNutritionCategoriesPending ? '100%' : '',
          }}
        >
          {isNutritionCategoriesPending ? (
            <Loader />
          ) : (
            <div
              className="foodList"
              style={{ height: selectedPdfId ? '50vh' : '' }}
            >
              {nutritionCategories.data.map(({ iconUrl, id, title }) => (
                <TitleCard
                  key={id}
                  title={title}
                  iconSrc={iconUrl}
                  onClick={() => setSelectedPdfId(id)}
                />
              ))}
            </div>
          )}
          {selectedPdfId && (
            <div className={`pdf-wrapper ${selectedPdfId ? 'slide-in' : ''}`}>
              <PdfViewer
                isLoading={isNutritionPlanLoading}
                pdfSrc={nutritionPlan?.data?.pdfUrl}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
