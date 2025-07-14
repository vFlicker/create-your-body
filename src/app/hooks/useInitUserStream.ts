import { useEffect } from 'react';

import { User, useStreamStore } from '~/entities/user';

export const useInitUserStream = (user?: User): void => {
  const { setStream } = useStreamStore();

  useEffect(() => {
    if (!user) return;

    const subscriptions = user.subscriptions;

    if (subscriptions.length > 0) {
      const streams = subscriptions.map(({ stream }) => stream);
      const maxStream = Math.max(...streams);
      setStream(maxStream);
    }
  }, [user, setStream]);
};
