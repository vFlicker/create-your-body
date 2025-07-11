import { JSX } from 'react';
import { useParams } from 'react-router-dom';

import { useNutritionPlan } from '~/entities/nutrition';
import { useUser } from '~/entities/user';
import foodIconSrc from '~/shared/assets/svg/food.svg';
import { PdfViewer } from '~/shared/ui/molecules/pdfViewer';
import { CommonPageLayout } from '~/widgets/layouts/CommonPageLayout';

export function FoodPage(): JSX.Element {
  const { categoryId } = useParams<{ categoryId: string }>();

  const { user } = useUser();

  const { nutritionPlan, isNutritionPlanLoading } = useNutritionPlan(
    categoryId!,
    user?.tgId,
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
