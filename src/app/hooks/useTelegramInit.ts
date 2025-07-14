import { useEffect, useState } from 'react';

import { userSession } from '~/shared/libs/userSession';

export const useTelegramInit = (): boolean => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (Telegram && Telegram.WebApp) {
      const { WebApp } = Telegram;

      WebApp.ready();
      WebApp.expand();
      WebApp.disableVerticalSwipes();

      const { initData } = WebApp;

      userSession.setCurrentUser({
        userQuery: initData,
      });
    }

    setIsInitialized(true);
  }, []);

  return isInitialized;
};
