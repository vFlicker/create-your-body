import { useCallback, useState } from 'react';

export interface useDialogStackReturn {
  isOpen: boolean;
  activeIndex: number;
  totalDialogs: number;
  open: (startIndex?: number) => void;
  close: () => void;
  goToNext: () => void;
  goToPrevious: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
  setTotalDialogs: (total: number) => void;
  setActiveIndex: (index: number) => void;
}

export function useDialogStack(totalDialogs = 1): useDialogStackReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dialogsCount, setDialogsCount] = useState(totalDialogs);

  const open = useCallback((startIndex = 0) => {
    setActiveIndex(startIndex);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setActiveIndex(0); // Reset to first dialog when closing
  }, []);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => Math.min(prev + 1, dialogsCount - 1));
  }, [dialogsCount]);

  const goToPrevious = useCallback(() => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const setTotalDialogs = useCallback((total: number) => {
    setDialogsCount(total);
  }, []);

  const setActiveIndexDirect = useCallback(
    (index: number) => {
      setActiveIndex(Math.max(0, Math.min(index, dialogsCount - 1)));
    },
    [dialogsCount],
  );

  const canGoBack = activeIndex > 0;
  const canGoNext = activeIndex < dialogsCount - 1;

  return {
    isOpen,
    activeIndex,
    totalDialogs: dialogsCount,
    canGoBack,
    canGoNext,
    open,
    close,
    goToNext,
    goToPrevious,
    setTotalDialogs,
    setActiveIndex: setActiveIndexDirect,
  };
}
