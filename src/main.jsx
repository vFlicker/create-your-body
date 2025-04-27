import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppDev } from './app/AppDev';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <AppDev />
  </StrictMode>,
);
