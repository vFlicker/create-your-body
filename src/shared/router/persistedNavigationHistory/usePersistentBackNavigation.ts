import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  loadPersistedNavigationHistory,
  setPendingGotoIndex,
} from './persistentNavigationHistoryLib';

type UsePersistentBackResult = {
  goBack: () => boolean;
};

export const usePersistentBackNavigation = (): UsePersistentBackResult => {
  const navigate = useNavigate();

  const goBack = useCallback((): boolean => {
    const stored = loadPersistedNavigationHistory();
    if (!stored) return false;
    if (stored.index <= 0) return false;

    const nextIndex = stored.index - 1;
    const target = stored.entries[nextIndex];
    if (!target) return false;

    setPendingGotoIndex(nextIndex);
    navigate(target, { replace: true });
    return true;
  }, [navigate]);

  return { goBack };
};
