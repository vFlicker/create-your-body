import { useEffect, useState } from 'react';

const createBlobUrl = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

export const usePdfBlob = (pdfSrc: string): string | undefined => {
  const [pdfSrcBlob, setPdfSrcBlob] = useState<string>();

  useEffect(() => {
    let isMounted = true;
    let previousBlobUrl: string | undefined;

    const fetchPdfBlob = async () => {
      try {
        const blobUrl = await createBlobUrl(pdfSrc);
        if (isMounted) {
          setPdfSrcBlob(blobUrl);
          previousBlobUrl = blobUrl;
        }
      } catch (error) {
        if (isMounted) setPdfSrcBlob(undefined);
        console.error('Error fetching PDF blob:', error);
      }
    };

    fetchPdfBlob();

    return () => {
      isMounted = false;
      if (previousBlobUrl) URL.revokeObjectURL(previousBlobUrl);
    };
  }, [pdfSrc]);

  return pdfSrcBlob;
};
