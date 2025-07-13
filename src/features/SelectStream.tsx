import { JSX, useEffect } from 'react';

import { useSubscriptions } from '~/entities/subscription';
import { useStreamStore } from '~/entities/user';
import { Select } from '~/shared/ui/atoms/Select';

export function SelectStream(): JSX.Element | null {
  const { subscriptions, isSubscriptionsPending } = useSubscriptions();
  const { stream, setStream } = useStreamStore();

  useEffect(() => {
    if (!subscriptions) return;

    if (!stream && subscriptions.length > 0) {
      const streams = subscriptions.map(({ stream }) => stream);
      const maxStream = Math.max(...streams);
      setStream(maxStream);
    }
  }, [subscriptions, isSubscriptionsPending, stream, setStream]);

  if (isSubscriptionsPending || !subscriptions) {
    return null;
  }

  const streamOptions = subscriptions.map(({ stream }) => ({
    value: stream.toString(),
    label: `Поток ${stream}`,
  }));

  return (
    <Select
      options={streamOptions}
      value={stream?.toString() || ''}
      onChange={(evt) => setStream(+evt.target.value)}
    />
  );
}
