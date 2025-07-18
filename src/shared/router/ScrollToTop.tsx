import { JSX, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop(): JSX.Element | null {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
