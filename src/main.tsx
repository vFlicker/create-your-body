import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppWithProviders } from './app';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithProviders />
  </StrictMode>,
);
