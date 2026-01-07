import { JSX, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';

import { PersistedNavigationHistory } from './persistedNavigationHistoryTypes';
import {
  consumePendingGotoIndex,
  loadPersistedNavigationHistory,
  savePersistedNavigationHistory,
} from './persistentNavigationHistoryLib';

function createInitialState(currentPath: string): PersistedNavigationHistory {
  return {
    entries: [currentPath],
    index: 0,
  };
}

export function PersistentNavigationHistory(): JSX.Element | null {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  const stateRef = useRef<PersistedNavigationHistory | null>(null);
  const skipNextSyncRef = useRef(false);

  const currentPath = `${location.pathname}${location.search}${location.hash}`;

  useEffect(() => {
    const stored = loadPersistedNavigationHistory();
    stateRef.current = stored || createInitialState(currentPath);

    if (location.pathname !== '/') return;
    if (!stored) return;

    const storedCurrent = stored.entries[stored.index];
    if (
      !storedCurrent ||
      storedCurrent === '/' ||
      storedCurrent === currentPath
    ) {
      return;
    }

    skipNextSyncRef.current = true;
    navigate(storedCurrent, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const currentState = stateRef.current || createInitialState(currentPath);

    const pendingIndex = consumePendingGotoIndex();
    if (pendingIndex !== null) {
      const nextIndex = Math.max(
        0,
        Math.min(pendingIndex, currentState.entries.length - 1),
      );
      currentState.index = nextIndex;
      stateRef.current = currentState;
      savePersistedNavigationHistory(currentState);
      return;
    }

    if (skipNextSyncRef.current) {
      skipNextSyncRef.current = false;
      return;
    }

    const { entries, index } = currentState;

    if (navigationType === 'PUSH') {
      const nextEntries = entries.slice(0, index + 1);
      const last = nextEntries[nextEntries.length - 1];
      if (last !== currentPath) {
        nextEntries.push(currentPath);
      }
      currentState.entries = nextEntries;
      currentState.index = nextEntries.length - 1;
    } else if (navigationType === 'REPLACE') {
      const nextEntries = entries.slice();
      nextEntries[index] = currentPath;
      currentState.entries = nextEntries;
    } else {
      const foundIndex = entries.lastIndexOf(currentPath);
      if (foundIndex >= 0) {
        currentState.index = foundIndex;
      } else {
        const nextEntries = entries.slice(0, index + 1);
        nextEntries.push(currentPath);
        currentState.entries = nextEntries;
        currentState.index = nextEntries.length - 1;
      }
    }

    stateRef.current = currentState;
    savePersistedNavigationHistory(currentState);
  }, [currentPath, navigationType]);

  return null;
}
