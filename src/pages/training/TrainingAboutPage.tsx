import { JSX } from 'react';

import pdfSrc from '~/shared/assets/pdf/trane.pdf';
import musclesIconSrc from '~/shared/assets/svg/musclesBlack.svg';
import { PdfViewer } from '~/shared/ui/molecules/pdfViewer';
import { CommonPageLayout } from '~/widgets/layouts/CommonPageLayout';

export function TrainingAboutPage(): JSX.Element {
  return (
    <CommonPageLayout
      title="Все о тренировках"
      iconSrc={musclesIconSrc}
      isLoading={false}
    >
      <PdfViewer pdfSrc={pdfSrc} />
    </CommonPageLayout>
  );
}
