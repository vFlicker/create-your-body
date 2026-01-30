import { PersistedNavigationHistory } from './persistedNavigationHistoryTypes';

const STORAGE_KEY = 'cyb:navigationHistory:v2';

// Sanitize path - remove incorrect base path prefixes
// React Router's useLocation().pathname should be relative to basename,
// so paths should NOT contain /testapp or /testerapp prefixes
const sanitizePath = (path: string): string => {
  // Remove any /testapp or /testerapp prefixes (shouldn't be in relative paths)
  return path.replace(/^\/(testapp|testerapp)(\/|$)/, '/');
};

// Check if path is valid (relative paths shouldn't start with /testapp or /testerapp)
const isValidPath = (path: string): boolean => {
  return !path.startsWith('/testapp') && !path.startsWith('/testerapp');
};

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

      const stored = JSON.parse(raw) as PersistedNavigationHistory;

      // Filter out invalid entries and sanitize paths
      const validEntries = stored.entries.filter(isValidPath).map(sanitizePath);

      if (validEntries.length === 0) {
        return null;
      }

      // Adjust index if needed
      const newIndex = Math.min(stored.index, validEntries.length - 1);

      return {
        entries: validEntries,
        index: Math.max(0, newIndex),
      };
    } catch {
      return null;
    }
  };

export const savePersistedNavigationHistory = (
  state: PersistedNavigationHistory,
): void => {
  try {
    // Sanitize entries before saving
    const sanitizedState: PersistedNavigationHistory = {
      entries: state.entries.filter(isValidPath).map(sanitizePath),
      index: state.index,
    };

    // Adjust index if needed after filtering
    sanitizedState.index = Math.min(
      sanitizedState.index,
      Math.max(0, sanitizedState.entries.length - 1),
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitizedState));
  } catch {
    // Ignore storage errors
  }
};
