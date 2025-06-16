import { JSX, useEffect } from 'react';

import { useUpdateUserAvatar, useUser } from '~/entities/user';
import { NoEntryPage } from '~/pages/noEntry';
import { useUserSession } from '~/shared/store';
import { Loader } from '~/shared/ui/Loader';

import { useInitTgApp } from '../hooks/useInitTgApp';
import { withProviders } from '../providers';
import { Routing } from './Routing';

function App(): JSX.Element {
  useInitTgApp();

  const { tgId: id, userImage: image, userQuery } = useUserSession();
  const { user, isUserPending } = useUser();
  const { updateUserAvatar, isUpdateUserAvatarPending } = useUpdateUserAvatar();

  useEffect(() => {
    if (userQuery && id && image) {
      updateUserAvatar({ id, image });
    }
  }, [updateUserAvatar, id, image, userQuery]);

  if (isUpdateUserAvatarPending || isUserPending) return <Loader />;

  const hasAccess = user.subscriptions?.length > 0;
  if (!hasAccess) return <NoEntryPage />;

  return <Routing />;
}

export const AppWithProviders = withProviders(App);
