import { createRoot } from 'react-dom/client';

import { AppWithProviders } from './app';
import { ErrorBoundary } from './shared/ui/molecules/errorBoundary';

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <AppWithProviders />
  </ErrorBoundary>,
);

window.addEventListener('error', (evt) => {
  fetch('https://cybapp.ru/v2/api/client/log', {
    method: 'POST',
    body: JSON.stringify({
      error: evt.message,
      stack: evt.error?.stack,
      userAgent: navigator.userAgent,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
});

window.addEventListener('unhandledrejection', (evt) => {
  fetch('https://cybapp.ru/v2/api/client/log', {
    method: 'POST',
    body: JSON.stringify({
      error: evt.reason?.message || 'Unhandled rejection',
      stack: evt.reason?.stack,
      userAgent: navigator.userAgent,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
});
