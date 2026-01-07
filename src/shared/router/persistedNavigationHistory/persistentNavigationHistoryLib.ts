import { PersistedNavigationHistory } from './persistedNavigationHistoryTypes';

const STORAGE_KEY = 'cyb:navigationHistory:v1';

let pendingGotoIndex: number | null = null;

export const setPendingGotoIndex = (nextIndex: number): void => {
  pendingGotoIndex = nextIndex;
};

export const consumePendingGotoIndex = (): number | null => {
  const value = pendingGotoIndex;
  pendingGotoIndex = null;
  return value;
};

export const loadPersistedNavigationHistory =
  (): PersistedNavigationHistory | null => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as PersistedNavigationHistory;
    } catch {
      return null;
    }
  };

export const savePersistedNavigationHistory = (
  state: PersistedNavigationHistory,
): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage errors
  }
};
