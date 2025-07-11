import { useEffect } from 'react';

import { userSession } from '~/shared/libs/userSession';

const MOCK_USER_QUERY =
  'query_id=AAHeQjUqAgAAAN5CNSphXg-_&user=%7B%22id%22%3A5003100894%2C%22first_name%22%3A%22Vladyslav%22%2C%22last_name%22%3A%22Sliusar%22%2C%22username%22%3A%22vFlicker%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FuDnD8SAXAvwYTy_EsnWuicjYOryNK03zY2-bxDXnzn9GogyZmGEjYaD9xuNa7Glc.svg%22%7D&auth_date=1746115559&signature=ntEo5NStvuDC5iFb5eL7h0PToBCPu4wDPPT3SdmZMLmqG-UpGS7n98k4rE0B0D6hqvgS9kucLOcU85wfymuvBw&hash=372c96f818d87bff896af566daa37b9115d3bf90d8da1d93c49281284448b4d6';

export const useInitTgApp = () => {
  useEffect(() => {
    if (Telegram && Telegram.WebApp) {
      const { WebApp } = Telegram;

      WebApp.ready();
      WebApp.expand();
      WebApp.disableVerticalSwipes();

      const { initData } = WebApp;

      userSession.setCurrentUser({
        userQuery: initData || MOCK_USER_QUERY,
      });
    }
  }, []);
};
