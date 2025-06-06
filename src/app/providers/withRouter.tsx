import { ComponentType, JSX } from 'react';
import { BrowserRouter } from 'react-router-dom';

const BASE_NAME = '/testapp';

const withRouter = (Component: ComponentType): ComponentType => {
  function WithRouter(): JSX.Element {
    return (
      <BrowserRouter basename={BASE_NAME}>
        <Component />
      </BrowserRouter>
    );
  }

  return WithRouter;
};

export { withRouter };
