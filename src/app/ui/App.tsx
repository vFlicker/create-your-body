import { JSX } from 'react';

import { ModalHost } from '~/entities/modal';
import { useUser } from '~/entities/user';
import { userSession } from '~/shared/libs/userSession';
import { Loader } from '~/shared/ui/atoms/Loader';

import { useInitTgApp } from '../hooks/useInitTgApp';
import { withProviders } from '../providers';
import { Routing } from './Routing';

function App(): JSX.Element {
  useInitTgApp();

  const currentUserSession = userSession.getCurrentUser();
  const { user, isUserPending } = useUser();

  if (!user || isUserPending || !currentUserSession) {
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
