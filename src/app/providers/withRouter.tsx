import { ComponentType, JSX } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ScrollToTop } from '~/shared/router';

const BASE_NAME = import.meta.env.VITE_BASE_PATH || '/';

const withRouter = (Component: ComponentType): ComponentType => {
  function WithRouter(): JSX.Element {
    return (
      <BrowserRouter basename={BASE_NAME}>
        <ScrollToTop />
        <Component />
      </BrowserRouter>
    );
  }

  return WithRouter;
};

export { withRouter };
