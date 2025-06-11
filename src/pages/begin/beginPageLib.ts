import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export type ViewMode = 'Видео' | 'Подготовка';

export const useViewMode = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const viewParam = queryParams.get('view');
  const initialViewMode = viewParam === 'video' ? 'Видео' : 'Подготовка';

  const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode);

  return { viewMode, setViewMode };
};
