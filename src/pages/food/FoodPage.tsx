import { JSX } from 'react';
import { useParams } from 'react-router-dom';

import { useNutritionPlan } from '~/entities/nutrition';
import foodIconSrc from '~/shared/assets/svg/food.svg';
import { userSession } from '~/shared/libs/userSession';
import { PdfViewer } from '~/shared/ui/molecules/pdfViewer';
import { CommonPageLayout } from '~/widgets/layouts/CommonPageLayout';

export function FoodPage(): JSX.Element {
  const { categoryId } = useParams<{ categoryId: string }>();

  const currentUser = userSession.getCurrentUser();

  const { nutritionPlan, isNutritionPlanLoading } = useNutritionPlan(
    currentUser!.tgId,
    categoryId!,
  );

  if (!nutritionPlan || isNutritionPlanLoading)
    return (
      <CommonPageLayout
        title="Питание"
        iconSrc={foodIconSrc}
        isLoading={isNutritionPlanLoading}
      />
    );

  return (
    <CommonPageLayout title="Питание" iconSrc={foodIconSrc}>
      <PdfViewer
        isLoading={isNutritionPlanLoading}
        pdfSrc={nutritionPlan.data.pdfUrl}
      />
    </CommonPageLayout>
  );
}
