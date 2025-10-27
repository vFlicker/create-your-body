import { JSX } from 'react';

import {
  isSubscriptionActive,
  useSubscriptions,
} from '~/entities/subscription';
import { useStreamStore } from '~/entities/user';
import { Select } from '~/shared/ui/atoms/Select';

export function SelectStream(): JSX.Element | null {
  const { subscriptions, isSubscriptionsPending } = useSubscriptions();
  const { selectedStream, setSelectedStream } = useStreamStore();

  if (isSubscriptionsPending || !subscriptions) {
    return null;
  }

  const validSubscriptions = subscriptions.filter(isSubscriptionActive);
  const streamOptions = validSubscriptions.map(({ stream }) => ({
    value: stream.toString(),
    label: `Поток ${stream}`,
  }));

  if (streamOptions.length === 0) {
    return null;
  }

  return (
    <Select
      options={streamOptions}
      value={selectedStream?.toString() || ''}
      onChange={(evt) => setSelectedStream(+evt.target.value)}
    />
  );
}
