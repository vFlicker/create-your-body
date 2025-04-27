import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import './PdfViewer.css';

import {
  ScrollMode,
  SpecialZoomLevel,
  Viewer,
  Worker,
} from '@react-pdf-viewer/core';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { BASE_API_URL } from '~/shared/api';

import close from '../../Assets/svg/close.svg';
import fullscreen from '../../Assets/svg/fullscreen.svg';
import left from '../../Assets/svg/left.svg';
import right from '../../Assets/svg/right.svg';
import Loader from '../Loader/Loader';

const WORKER_URL = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

export default function PdfViewer({ pdfId, pdfFile, userId, addLog }) {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { jumpToNextPage, jumpToPreviousPage, CurrentPageLabel } =
    pageNavigationPluginInstance;

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const setupPdf = async () => {
      try {
        setIsLoading(true);
        if (pdfFile) {
          // Если передан прямой файл PDF
          const url =
            typeof pdfFile === 'string'
              ? pdfFile
              : URL.createObjectURL(pdfFile);
          setPdfUrl(url);
          addLog?.('PDF файл загружен из локального источника:', url);
        } else if (pdfId) {
          // Если передан ID для запроса
          addLog?.('Начало запроса PDF по ID:', pdfId);
          const response = await axios.get(
            `${BASE_API_URL}/cms/api/nutrition/client/${pdfId}?tg_id=${userId}`,
          );
          addLog?.('Ответ сервера на запрос PDF:', response.data);

          const pdfUrl = response.data.data.pdfUrl;
          addLog?.('Получен URL PDF:', pdfUrl);

          const pdfResponse = await fetch(pdfUrl);
          addLog?.(
            'Статус ответа при загрузке PDF:',
            pdfResponse.status,
            pdfResponse.statusText,
          );

          const blob = await pdfResponse.blob();
          const url = URL.createObjectURL(blob);
          setPdfUrl(url);
          addLog?.('PDF успешно загружен и преобразован в blob URL:', url);
        }
      } catch (err) {
        const errorDetails = {
          message: err.message,
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data,
          config: {
            url: err.config?.url,
            method: err.config?.method,
            headers: err.config?.headers,
          },
          stack: err.stack,
        };
        addLog?.(
          'Ошибка при загрузке PDF:',
          JSON.stringify(errorDetails, null, 2),
        );
      } finally {
        setIsLoading(false);
      }
    };

    setupPdf();

    return () => {
      if (pdfUrl && pdfUrl.startsWith('blob:')) {
        URL.revokeObjectURL(pdfUrl);
        addLog?.('Освобожден blob URL:', pdfUrl);
      }
    };
  }, [pdfId, pdfFile, userId, addLog]);

  const renderPdfContent = () => (
    <>
      <div className={`fullscreenOverlay ${isFullscreen ? 'active' : ''}`} />

      {pdfUrl && (
        <div
          className={`pdfViewerContainer ${isFullscreen ? 'fullscreen' : ''}`}
        >
          <Worker workerUrl={WORKER_URL}>
            <Viewer
              defaultScale={SpecialZoomLevel.PageFit}
              scrollMode={ScrollMode.Page}
              fileUrl={pdfUrl}
              enableSmoothScroll={false}
              plugins={[pageNavigationPluginInstance]}
            />
          </Worker>

          <button
            className={`pdfViewerButton ${isFullscreen ? 'close' : 'fullscreen'}`}
            onClick={toggleFullscreen}
          >
            <img
              src={isFullscreen ? close : fullscreen}
              alt={isFullscreen ? 'close' : 'fullscreen'}
            />
          </button>

          <div className="pdfViewerFooter">
            <div className="pdfViewerFooterInner">
              <button className="pdfViewerButton" onClick={jumpToPreviousPage}>
                <img src={left} alt="previous" />
              </button>
              <CurrentPageLabel>
                {({ currentPage, numberOfPages }) => (
                  <div className="pdfViewerPages">
                    {currentPage + 1} / {numberOfPages}
                  </div>
                )}
              </CurrentPageLabel>
              <button className="pdfViewerButton" onClick={jumpToNextPage}>
                <img src={right} alt="next" />
              </button>
            </div>
          </div>
        </div>
      )}

      {pdfId === '67e68b630e3f348f8806f42f' && (
        <p>
          Рассчитать свою дневную калорийность можно на этих сайтах
          <br />
          <br />
          <a
            className="pdfViewerLink"
            href="https://www.calc.ru/kalkulyator-kalorii.html"
          >
            https://www.calc.ru/kalkulyator-kalorii.html
          </a>
          <br />
          <br />
          <a
            className="pdfViewerLink"
            href="https://www.yournutrition.ru/calories/"
          >
            https://www.yournutrition.ru/calories/
          </a>
          <br />
          <br />
          Как рассчитать свое КБЖУ(подробное видео)
          <br />
          <br />
          <a
            className="pdfViewerLink"
            href="https://cloud.mail.ru/public/xghf/QTxissgf7"
          >
            https://cloud.mail.ru/public/xghf/QTxissgf7
          </a>
        </p>
      )}
      {pdfId === '67e68bdb0e3f348f8806f433' && (
        <p>
          Как подогнать свое кбжу:
          <br />
          <br />
          <a
            className="pdfViewerLink"
            href="https://cloud.mail.ru/public/WHsZ/WKY7Egu4P"
          >
            https://cloud.mail.ru/public/WHsZ/WKY7Egu4P
          </a>
        </p>
      )}
      {pdfId === '67e68b020e3f348f8806f422' && (
        <p>
          Рассчитать свою дневную калорийность можно на этих сайтах
          <br />
          <br />
          <a
            className="pdfViewerLink"
            href="https://www.calc.ru/kalkulyator-kalorii.html"
          >
            https://www.calc.ru/kalkulyator-kalorii.html
          </a>
          <br />
          <br />
          <a
            className="pdfViewerLink"
            href="https://www.yournutrition.ru/calories/"
          >
            https://www.yournutrition.ru/calories/
          </a>
        </p>
      )}
    </>
  );

  if (isFullscreen) {
    return createPortal(renderPdfContent(), document.body);
  }

  return (
    <div className="mainPdfViewer">
      {isLoading ? <Loader /> : renderPdfContent()}
    </div>
  );
}
