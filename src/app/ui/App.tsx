import { JSX, useEffect } from 'react';

import { useUpdateUserAvatar, useUser } from '~/entities/user';
import { NoEntryPage } from '~/pages/noEntry';
import { userSession } from '~/shared/libs/userSession';
import { Loader } from '~/shared/ui/Loader';

import { useInitTgApp } from '../hooks/useInitTgApp';
import { withProviders } from '../providers';
import { Routing } from './Routing';

function App(): JSX.Element {
  useInitTgApp();

  const currentUserSession = userSession.getCurrentUser();
  const { updateUserAvatar, isUpdateUserAvatarPending } = useUpdateUserAvatar();

  useEffect(() => {
    if (currentUserSession) {
      const { userImage, tgId } = currentUserSession;
      if (!userImage) return;
      updateUserAvatar({ userId: tgId, userImage: userImage });
    }
  }, [currentUserSession, updateUserAvatar]);

  const { user, isUserPending } = useUser();

  if (
    !user ||
    isUpdateUserAvatarPending ||
    isUserPending ||
    !currentUserSession
  ) {
    return <Loader />;
  }

  const hasAccess = user.subscriptions?.length > 0;
  if (!hasAccess) return <NoEntryPage />;

  return <Routing />;
}

export const AppWithProviders = withProviders(App);
