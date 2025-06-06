import './FoodPage.css';
import '../communication/CommunicationPage.css';

import { useParams } from 'react-router-dom';

import { useNutritionPlan } from '~/entities/nutrition';
import { UserMeta } from '~/entities/user';
import food from '~/shared/assets/nav/food.svg';
import { PdfViewer } from '~/shared/ui/pdfViewer';

export function FoodPage() {
  const { categoryId } = useParams<{ categoryId: string }>();

  const { isNutritionPlanLoading, nutritionPlan } =
    useNutritionPlan(categoryId);

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
        <div className="content-wrapper-food">
          <div className={`pdf-wrapper ${categoryId ? 'slide-in' : ''}`}>
            <PdfViewer
              isLoading={isNutritionPlanLoading}
              pdfSrc={nutritionPlan?.data?.pdfUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
