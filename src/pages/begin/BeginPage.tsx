import styled from '@emotion/styled';
import { JSX } from 'react';

import pdfSrc from '~/shared/assets/pdf/begin.pdf';
import healthIconSrc from '~/shared/assets/svg/health.svg';
import begin from '~/shared/assets/video/begin.mp4';
import { PdfViewer } from '~/shared/ui/pdfViewer';
import { Toggler } from '~/shared/ui/Toggler';
import { CommonPageLayout } from '~/widgets/CommonPageLayout';

import VideoPage from '../../Components/VideoPage/VideoPage';
import { useViewMode, ViewMode } from './beginPageLib';

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

        {viewMode === 'Видео' && (
          <VideoPage video={begin} page="/begin" instruction={true} />
        )}

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
