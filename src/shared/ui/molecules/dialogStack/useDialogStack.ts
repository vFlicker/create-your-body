import { useCallback, useState } from 'react';

export interface UseDialogStackReturn {
  isOpen: boolean;
  activeIndex: number;
  open: () => void;
  close: () => void;
  toggle: () => void;
  goToNext: () => void;
  goToPrevious: () => void;
  goToIndex: (index: number) => void;
  setIsOpen: (open: boolean) => void;
  setActiveIndex: (index: number) => void;
}

export function useDialogStack(
  initialOpen = false,
  initialIndex = 0,
): UseDialogStackReturn {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Reset to first dialog when closing
    setActiveIndex(0);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (isOpen) {
      setActiveIndex(0);
    }
  }, [isOpen]);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => prev + 1);
  }, []);

  const goToPrevious = useCallback(() => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const goToIndex = useCallback((index: number) => {
    setActiveIndex(Math.max(0, index));
  }, []);

  return {
    isOpen,
    activeIndex,
    open,
    close,
    toggle,
    goToNext,
    goToPrevious,
    goToIndex,
    setIsOpen,
    setActiveIndex,
  };
}
