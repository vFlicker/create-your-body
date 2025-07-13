import { ComponentType, JSX } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ScrollToTop } from '~/shared/router';

const BASE_NAME = '/testapp';

const withRouter = (Component: ComponentType): ComponentType => {
  function WithRouter(): JSX.Element {
    return (
      <BrowserRouter>
        <ScrollToTop />
        <Component />
      </BrowserRouter>
    );
  }

  return WithRouter;
};

export { withRouter };
