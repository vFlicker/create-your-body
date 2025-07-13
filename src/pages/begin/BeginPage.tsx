import styled from '@emotion/styled';
import { JSX } from 'react';

import pdfSrc from '~/shared/assets/pdf/begin.pdf';
import healthIconSrc from '~/shared/assets/svg/health.svg';
import { Toggler } from '~/shared/ui/atoms/Toggler';
import { PdfViewer } from '~/shared/ui/molecules/pdfViewer';
import { CommonPageLayout } from '~/widgets/layouts/CommonPageLayout';

import { useViewMode, ViewMode } from './beginPageLib';
import { VideoScreen } from './VideoScreen';

export function BeginPage(): JSX.Element {
  const { viewMode, setViewMode } = useViewMode();

  return (
    <CommonPageLayout
      title="Введение"
      iconSrc={healthIconSrc}
      isLoading={false}
    >
      <StyledBeginPageWrapper>
        <Toggler
          values={['Подготовка', 'Видео']}
          activeValue={viewMode}
          onClick={(value) => setViewMode(value as ViewMode)}
        />

        {viewMode === 'Видео' && <VideoScreen />}
        {viewMode === 'Подготовка' && <PdfViewer pdfSrc={pdfSrc} />}
      </StyledBeginPageWrapper>
    </CommonPageLayout>
  );
}

const StyledBeginPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
