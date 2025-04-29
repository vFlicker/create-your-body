import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppDev } from './app';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <div>
      test
      <AppDev />
    </div>
  </StrictMode>,
);
