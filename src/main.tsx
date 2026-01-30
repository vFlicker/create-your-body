import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppWithProviders } from './app';
import { userSession } from './shared/libs/userSession';
import { ErrorBoundary } from './shared/ui/molecules/errorBoundary';

// Fix incorrect base path in URL (redirect /testerapp/ or wrong /testapp/ to correct path)
const expectedBasePath = import.meta.env.VITE_BASE_PATH || '/';
const currentPath = window.location.pathname;

if (expectedBasePath === '/') {
  // Production: redirect any /testapp/ or /testerapp/ to root
  if (
    currentPath.startsWith('/testapp') ||
    currentPath.startsWith('/testerapp')
  ) {
    const newPath = currentPath.replace(/^\/(testapp|testerapp)/, '');
    window.location.replace(newPath || '/');
  }
}

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
      type: 'error',
      token: userSession.getCurrentUser(),
      initData: Telegram?.WebApp?.initData,
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
      type: 'unhandledrejection',
      token: userSession.getCurrentUser(),
      initData: Telegram?.WebApp?.initData,
      error: evt.reason?.message || 'Unhandled rejection',
      stack: evt.reason?.stack,
      userAgent: navigator.userAgent,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
});
