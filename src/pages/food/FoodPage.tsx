import { useParams } from 'react-router-dom';

import { useNutritionPlan } from '~/entities/nutrition';
import foodIconSrc from '~/shared/assets/nav/food.svg';
import { PdfViewer } from '~/shared/ui/pdfViewer';
import { CommonPageLayout } from '~/widgets/CommonPageLayout';

export function FoodPage() {
  const { categoryId } = useParams<{ categoryId: string }>();

  const { isNutritionPlanLoading, nutritionPlan } =
    useNutritionPlan(categoryId);

  return (
    <CommonPageLayout
      title="Питание"
      iconSrc={foodIconSrc}
      isLoading={isNutritionPlanLoading}
    >
      <PdfViewer
        isLoading={isNutritionPlanLoading}
        pdfSrc={nutritionPlan?.data?.pdfUrl}
      />
    </CommonPageLayout>
  );
}
