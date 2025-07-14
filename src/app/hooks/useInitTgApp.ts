import { useEffect } from 'react';

import { userSession } from '~/shared/libs/userSession';

export const useInitTgApp = () => {
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
  }, []);
};
