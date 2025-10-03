import { JSX } from 'react';

import { ModalHost } from '~/entities/modal';
import { useUser } from '~/entities/user';
import { Loader } from '~/shared/ui/atoms/Loader';

import { useInitUserStream } from '../hooks/useInitUserStream';
import { useTelegramInit } from '../hooks/useTelegramInit';
import { withProviders } from '../providers';
import { Routing } from './Routing';

function App(): JSX.Element {
  const isTgInitialized = useTelegramInit();
  const { user, isUserPending } = useUser({ enabled: isTgInitialized });

  useInitUserStream(user);

  if (!isTgInitialized || !user || isUserPending) {
    return <Loader />;
  }

  const isDev = import.meta.env.VITE_BASE_PATH === '/testapp/';

  return (
    <>
      {isDev && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999,
            backgroundColor: 'tomato',
            color: 'white',
            padding: '2px 8px',
            fontSize: 12,
          }}
        >
          DEV MOD
        </div>
      )}
      <Routing />
      <ModalHost />
    </>
  );
}

export const AppWithProviders = withProviders(App);
