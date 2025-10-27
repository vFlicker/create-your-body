import { useEffect } from 'react';

import { isSubscriptionActive } from '~/entities/subscription';
import { User, useStreamStore } from '~/entities/user';

export const useStreamStateInitializer = (user?: User): void => {
  const { selectedStream, setSelectedStream } = useStreamStore();

  useEffect(() => {
    if (!user) return;

    const subscriptions = user.subscriptions;

    const validSubscriptions = subscriptions.filter(isSubscriptionActive);
    const hasValidSubscriptions = validSubscriptions.length > 0;
    const hasSelectedStream = selectedStream !== null;

    if (!hasValidSubscriptions) {
      if (hasSelectedStream) setSelectedStream(null);
      return;
    }

    const validStreams = validSubscriptions.map(({ stream }) => stream);
    const maxValidStream = Math.max(...validStreams);
    const selectedStreamIsValid =
      hasSelectedStream && validStreams.includes(selectedStream);

    if (!selectedStreamIsValid) {
      setSelectedStream(maxValidStream);
    }
  }, [user, selectedStream, setSelectedStream]);
};
