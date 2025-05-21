import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ComponentType, JSX } from 'react';

import { queryClient } from '~/shared/api/queryClient';

const withReactQuery = (Component: ComponentType): ComponentType => {
  function WithReactQuery(): JSX.Element {
    return (
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Component />
      </QueryClientProvider>
    );
  }

  return WithReactQuery;
};

export { withReactQuery };
