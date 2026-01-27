import { useEffect, useState } from 'react';

import { userSession } from '~/shared/libs/userSession';

const IS_PRODUCTION = import.meta.env.VITE_BASE_PATH === '/';

const MOCK_USER_QUERY =
  'query_id=AAGuywgKAAAAAK7LCAr1H57M&user=%7B%22id%22%3A168348590%2C%22first_name%22%3A%22Lev%22%2C%22last_name%22%3A%22Pavlov%22%2C%22username%22%3A%22levpavloff%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FOJ_pF8TyYOKha5J9CwCS_OymrNa4T6kx-m783OvRK6Y.svg%22%7D&auth_date=1769192597&signature=p4QtRI5-wju2UYl-j7XRpsvkFZLwO1uJ91ixT7VyeqV2x5-xHuZVcgwabyiAJZaZHqA6T4db9AZeHzJ4R_z-Ag&hash=dcf3acad2e60ae60230c00956d504fec20de1017da143fa31ad3edec4b56656b';

export const useTelegramInit = (): boolean => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (Telegram && Telegram.WebApp) {
      const { WebApp } = Telegram;

      WebApp.ready();
      WebApp.expand();
      WebApp.disableVerticalSwipes();
    }

    if (!IS_PRODUCTION) {
      userSession.setCurrentUser({
        userQuery: MOCK_USER_QUERY,
      });
      setIsInitialized(true);
      return;
    }

    if (Telegram && Telegram.WebApp) {
      const { initData } = Telegram.WebApp;

      userSession.setCurrentUser({
        userQuery: initData,
      });
    }

    setIsInitialized(true);
  }, []);

  return isInitialized;
};
