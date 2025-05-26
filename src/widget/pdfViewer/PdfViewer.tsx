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
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import Loader from '~/Components/Loader/Loader';
import { apiService } from '~/shared/api';
import close from '~/shared/assets/svg/close.svg';
import fullscreen from '~/shared/assets/svg/fullscreen.svg';
import left from '~/shared/assets/svg/left.svg';
import right from '~/shared/assets/svg/right.svg';

import { Color } from '../../shared/theme/colors';
import { pdfViewerAddition } from './pdfViewerAddition';

const WORKER_URL = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

type PdfViewerProps = {
  pdfId?: string;
  pdfFileSrc?: string;
  userQuery?: string;
  userId?: string;
};

export function PdfViewer({
  pdfId,
  pdfFileSrc,
  userQuery,
  userId,
}: PdfViewerProps) {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { jumpToNextPage, jumpToPreviousPage, CurrentPageLabel } =
    pageNavigationPluginInstance;

  const toggleFullscreen = () => {
    setIsFullscreen((prevIsFullscreen) => !prevIsFullscreen);
  };

  useEffect(() => {
    const loadPdfUrl = async () => {
      try {
        setIsLoading(true);

        if (pdfFileSrc) {
          setPdfUrl(pdfFileSrc);
          return;
        }

        const response = await apiService.getNutritionPlanByPdfId(
          userQuery,
          userId,
          pdfId,
        );

        const { pdfUrl } = response.data.data;
        setPdfUrl(pdfUrl);
      } catch (err) {
        console.error('Ошибка при загрузке PDF:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPdfUrl();
  }, [pdfId, pdfFileSrc, userId, userQuery]);

  const renderPdfContent = () => (
    <>
      <StyledFullscreenOverlay isActive={isFullscreen} />

      <StyledPdfViewerContainer $fullscreen={isFullscreen}>
        <Worker workerUrl={WORKER_URL}>
          <Viewer
            defaultScale={SpecialZoomLevel.PageFit}
            scrollMode={ScrollMode.Page}
            fileUrl={pdfUrl}
            enableSmoothScroll={false}
            plugins={[pageNavigationPluginInstance]}
          />
        </Worker>

        <StyledPdfViewerButton
          $fullscreen={isFullscreen}
          $close={isFullscreen}
          onClick={toggleFullscreen}
        >
          <img
            src={isFullscreen ? close : fullscreen}
            alt={isFullscreen ? 'close' : 'fullscreen'}
          />
        </StyledPdfViewerButton>

        <StyledPdfViewerFooter>
          <StyledPdfViewerFooterInner>
            <StyledPdfViewerButton onClick={jumpToPreviousPage}>
              <img src={left} alt="previous" />
            </StyledPdfViewerButton>
            <CurrentPageLabel>
              {({ currentPage, numberOfPages }) => (
                <StyledPdfViewerPages>
                  {currentPage + 1} / {numberOfPages}
                </StyledPdfViewerPages>
              )}
            </CurrentPageLabel>
            <StyledPdfViewerButton onClick={jumpToNextPage}>
              <img src={right} alt="next" />
            </StyledPdfViewerButton>
          </StyledPdfViewerFooterInner>
        </StyledPdfViewerFooter>
      </StyledPdfViewerContainer>

      {pdfViewerAddition[pdfId]}
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
  width: 100%;
`;

const StyledPdfViewerFooterInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  opacity: 0.7;
`;

const StyledPdfViewerButton = styled.button<{
  $fullscreen?: boolean;
  $close?: boolean;
}>`
  width: 40px;
  height: 40px;
  border: 1px solid #e6e6e6;
  background: #f2f2f2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: ${({ $fullscreen, $close }) =>
    $fullscreen || $close ? 'absolute' : 'static'};
  top: ${({ $fullscreen, $close }) =>
    $fullscreen || $close ? '16px' : 'auto'};
  right: ${({ $fullscreen, $close }) =>
    $fullscreen || $close ? '16px' : 'auto'};
  background: ${({ $fullscreen, $close }) =>
    $fullscreen || $close ? '#cbff52' : '#f2f2f2'};
  border: ${({ $fullscreen, $close }) =>
    $fullscreen || $close ? 'none' : '1px solid #e6e6e6'};
  z-index: ${({ $close }) => ($close ? 1001 : 1)};

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

const StyledPdfViewerPages = styled.div`
  font-size: 16px;
  font-weight: 700;
`;
