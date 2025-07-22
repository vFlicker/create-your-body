import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppWithProviders } from './app';
import { ErrorBoundary } from './shared/ui/molecules/errorBoundary';

// Set the viewport height property for dynamic viewport height support
const setVhProperty = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

setVhProperty();
window.addEventListener('resize', setVhProperty);
window.addEventListener('orientationchange', setVhProperty);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <AppWithProviders />
    </ErrorBoundary>
  </StrictMode>,
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
