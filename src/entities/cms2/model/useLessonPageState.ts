import { useEffect, useMemo, useState } from 'react';

import type { Cms2LessonResponse, Cms2Page, Cms2Progress } from '../cms2Types';

type UseLessonPageStateProps = {
  lesson: Cms2LessonResponse | undefined;
  progress: Cms2Progress | null | undefined;
};

type UseLessonPageStateReturn = {
  currentPageIndex: number;
  currentPage: Cms2Page | undefined;
  pages: Cms2Page[];
  isFirstPage: boolean;
  isLastPage: boolean;
  hasMultiplePages: boolean;
  isInitialized: boolean;
  setCurrentPageIndex: (index: number) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
};

export function useLessonPageState({
  lesson,
  progress,
}: UseLessonPageStateProps): UseLessonPageStateReturn {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const pages = useMemo(
    () => lesson?.contentBlocks.pages || [],
    [lesson?.contentBlocks.pages],
  );
  const currentPage = pages[currentPageIndex];
  const isFirstPage = currentPageIndex === 0;
  const isLastPage = currentPageIndex === pages.length - 1;
  const hasMultiplePages = pages.length > 1;

  // Restore position from progress
  useEffect(() => {
    if (lesson && progress?.progressData && !isInitialized) {
      const completedPages = progress.progressData.completedPages || [];

      if (completedPages.length > 0) {
        const completedSet = new Set(completedPages);
        // Находим индекс последней завершённой страницы по порядку в уроке
        for (let i = pages.length - 1; i >= 0; i--) {
          if (completedSet.has(pages[i].id)) {
            // Переходим на следующую после последней завершённой
            const nextIndex = Math.min(i + 1, pages.length - 1);
            setCurrentPageIndex(nextIndex);
            break;
          }
        }
      }
      setIsInitialized(true);
    } else if (lesson && !progress && !isInitialized) {
      setIsInitialized(true);
    }
  }, [lesson, progress, isInitialized, pages]);

  const goToNextPage = () => {
    if (!isLastPage) {
      setCurrentPageIndex((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (!isFirstPage) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  return {
    currentPageIndex,
    currentPage,
    pages,
    isFirstPage,
    isLastPage,
    hasMultiplePages,
    isInitialized,
    setCurrentPageIndex,
    goToNextPage,
    goToPrevPage,
  };
}
