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

  return (
    <>
      <Routing />
      <ModalHost />
    </>
  );
}

export const AppWithProviders = withProviders(App);
