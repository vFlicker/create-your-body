import React, { useEffect, useState } from "react";
import {
    Worker,
    Viewer,
    ScrollMode,
    SpecialZoomLevel,
} from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import axios from 'axios';
import { API_BASE_URL } from '../../API';

import right from "../../Assets/svg/right.svg";
import left from "../../Assets/svg/left.svg";
import Loader from "../Loader/Loader";

import "./PdfViewer.css";

const WORKER_URL = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

export default function PdfViewer({ pdfId, pdfFile }) {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const pageNavigationPluginInstance = pageNavigationPlugin();
    const { jumpToNextPage, jumpToPreviousPage, CurrentPageLabel } = pageNavigationPluginInstance;

    useEffect(() => {
        const setupPdf = async () => {
            try {
                setIsLoading(true);
                if (pdfFile) {
                    // Если передан прямой файл PDF
                    const url = typeof pdfFile === 'string' ? pdfFile : URL.createObjectURL(pdfFile);
                    setPdfUrl(url);
                } else if (pdfId) {
                    // Если передан ID для запроса
                    const response = await axios.get(`${API_BASE_URL}/cms/api/nutrition/client/${pdfId}`);
                    const pdfUrl = response.data.data.pdfUrl;
                    const pdfResponse = await fetch(pdfUrl);
                    const blob = await pdfResponse.blob();
                    const url = URL.createObjectURL(blob);
                    setPdfUrl(url);
                }
            } catch (err) {
                console.error("Error setting up PDF:", err);
            } finally {
                setIsLoading(false);
            }
        };

        setupPdf();

        return () => {
            if (pdfUrl && pdfUrl.startsWith('blob:')) {
                URL.revokeObjectURL(pdfUrl);
            }
        };
    }, [pdfId, pdfFile]);

    return (
        <div className="mainPdfViewer">
            {isLoading && <Loader />}

            {pdfUrl && (
                <div className="pdfViewerContainer">
                    <Worker workerUrl={WORKER_URL}>
                        <Viewer
                            defaultScale={SpecialZoomLevel.PageFit}
                            scrollMode={ScrollMode.Page}
                            fileUrl={pdfUrl}
                            enableSmoothScroll={false}
                            plugins={[pageNavigationPluginInstance]}
                        />
                    </Worker>

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
                <p>Рассчитать свою дневную калорийность можно на этих сайтах<br /><br />
                    <a href="https://www.calc.ru/kalkulyator-kalorii.html">https://www.calc.ru/kalkulyator-kalorii.html</a><br /><br />
                    <a href="https://www.yournutrition.ru/calories/">https://www.yournutrition.ru/calories/</a><br /><br />
                    Как рассчитать свое КБЖУ(подробное видео)<br /><br />
                    <a href="https://cloud.mail.ru/public/xghf/QTxissgf7">https://cloud.mail.ru/public/xghf/QTxissgf7</a>
                </p>
            )}
            {pdfId === '67e68bdb0e3f348f8806f433' && (
                <p>Как подогнать свое кбжу:<br /><br />
                    <a href="https://cloud.mail.ru/public/WHsZ/WKY7Egu4P">https://cloud.mail.ru/public/WHsZ/WKY7Egu4P</a>
                </p>
            )}
            {pdfId === '67e68b020e3f348f8806f422' && (
                <p>Рассчитать свою дневную калорийность можно на этих сайтах<br /><br />
                    <a href="https://www.calc.ru/kalkulyator-kalorii.html">https://www.calc.ru/kalkulyator-kalorii.html</a><br /><br />
                    <a href="https://www.yournutrition.ru/calories/">https://www.yournutrition.ru/calories/</a>
                </p>
            )}
        </div>
    );
} 