import { useEffect } from 'react';

import { useUpdateUserAvatar, useUser } from '~/entities/user';
import { NoEntryPage } from '~/pages/noEntry';
import { useUserSession } from '~/shared/store';
import { Loader } from '~/shared/ui/Loader';

import { useInitTgApp } from '../hooks/useInitTgApp';
import { withProviders } from '../providers';
import { Routing } from './Routing';

function App() {
  useInitTgApp();

  const { id, image, query } = useUserSession();
  const { user, isUserPending } = useUser();
  const { updateUserAvatar, isUpdateUserAvatarPending } = useUpdateUserAvatar();

  useEffect(() => {
    if (query && id && image) {
      updateUserAvatar({ id, image });
    }
  }, [updateUserAvatar, id, image, query]);

  if (isUpdateUserAvatarPending || isUserPending) return <Loader />;

  const hasAccess = !!user.user_tarif;
  if (!hasAccess) return <NoEntryPage />;

  return <Routing />;
}

export const AppWithProviders = withProviders(App);
