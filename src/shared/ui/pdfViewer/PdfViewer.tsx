import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';

import styled from '@emotion/styled';
import {
  ScrollMode,
  SpecialZoomLevel,
  Viewer,
  Worker,
} from '@react-pdf-viewer/core';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { JSX, useState } from 'react';
import { createPortal } from 'react-dom';

import close from '~/shared/assets/svg/close.svg';
import fullscreen from '~/shared/assets/svg/fullscreen.svg';
import left from '~/shared/assets/svg/left.svg';
import right from '~/shared/assets/svg/right.svg';
import { Loader } from '~/shared/ui/Loader';

import { Color } from '../../theme/colors';
import { pdfViewerAddition } from './pdfViewerAddition';
import { usePdfBlob } from './usePdfBlob';

const WORKER_URL = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

type PdfViewerProps = {
  pdfSrc: string;
  pdfId?: string;
  isLoading?: boolean;
};

export function PdfViewer({
  pdfSrc,
  pdfId,
  isLoading,
}: PdfViewerProps): JSX.Element {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const pdfSrcBlob = usePdfBlob(pdfSrc);

  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { jumpToNextPage, jumpToPreviousPage, CurrentPageLabel } =
    pageNavigationPluginInstance;

  const toggleFullscreen = () => {
    setIsFullscreen((prevIsFullscreen) => !prevIsFullscreen);
  };

  const renderPdfContent = () => (
    <>
      <StyledFullscreenOverlay isActive={isFullscreen} />

      <StyledPdfViewerContainer $fullscreen={isFullscreen}>
        <Worker workerUrl={WORKER_URL}>
          <Viewer
            defaultScale={SpecialZoomLevel.PageFit}
            scrollMode={ScrollMode.Page}
            fileUrl={pdfSrcBlob || pdfSrc}
            enableSmoothScroll={false}
            plugins={[pageNavigationPluginInstance]}
          />
        </Worker>

        <StyledCloseButton onClick={toggleFullscreen}>
          <img
            src={isFullscreen ? close : fullscreen}
            alt={isFullscreen ? 'close' : 'fullscreen'}
          />
        </StyledCloseButton>

        <StyledPdfViewerFooter>
          <StyledNavigationButton onClick={jumpToPreviousPage}>
            <img src={left} alt="previous" />
          </StyledNavigationButton>
          <CurrentPageLabel>
            {({ currentPage, numberOfPages }) => (
              <StyledPdfViewerPages>
                {currentPage + 1} / {numberOfPages}
              </StyledPdfViewerPages>
            )}
          </CurrentPageLabel>
          <StyledNavigationButton onClick={jumpToNextPage}>
            <img src={right} alt="next" />
          </StyledNavigationButton>
        </StyledPdfViewerFooter>
      </StyledPdfViewerContainer>

      {pdfId && pdfViewerAddition[pdfId]}
    </>
  );

  if (isFullscreen) {
    return createPortal(renderPdfContent(), document.body);
  }

  return (
    <StyledMainPdfViewer>
      {isLoading ? <Loader /> : renderPdfContent()}
    </StyledMainPdfViewer>
  );
}

const StyledMainPdfViewer = styled.div`
  width: 100%;
`;

const StyledPdfViewerContainer = styled.div<{ $fullscreen?: boolean }>`
  position: ${({ $fullscreen }) => ($fullscreen ? 'fixed' : 'relative')};
  top: ${({ $fullscreen }) => ($fullscreen ? 0 : 'auto')};
  left: ${({ $fullscreen }) => ($fullscreen ? 0 : 'auto')};
  width: ${({ $fullscreen }) => ($fullscreen ? '100vw' : '100%')};
  height: ${({ $fullscreen }) => ($fullscreen ? '100vh' : '400px')};
  z-index: ${({ $fullscreen }) => ($fullscreen ? 1000 : 1)};
  background: ${({ $fullscreen }) => ($fullscreen ? Color.White : Color.White)};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  .rpv-core__inner-page {
    background-color: inherit;
  }
`;

const StyledFullscreenOverlay = styled.div<{ isActive: boolean }>`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};

  background-color: rgba(0, 0, 0, 0.5);

  z-index: 999;
`;

const StyledPdfViewerFooter = styled.div`
  position: absolute;
  bottom: 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 16px;
  opacity: 0.7;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  border-radius: 50%;

  z-index: 9999;

  img {
    width: 20px;
    height: 20px;
  }
`;

const StyledNavigationButton = styled(StyledButton)`
  border: 1px solid #e6e6e6;
  background-color: #f2f2f2;
`;

const StyledCloseButton = styled(StyledButton)`
  position: absolute;
  top: 16px;
  right: 16px;

  background-color: #cbff52;
`;

const StyledPdfViewerPages = styled.div`
  font-size: 16px;
  font-weight: 700;
`;
