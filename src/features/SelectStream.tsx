import { JSX, useEffect } from 'react';

import { getMaxStream, useStreamStore, useUser } from '~/entities/user';
import { Select } from '~/shared/ui/Select';

export function SelectStream(): JSX.Element {
  const { user } = useUser();
  const { stream, setStream } = useStreamStore();

  const { subscriptions } = user;

  useEffect(() => {
    if (subscriptions?.length) {
      const maxStream = getMaxStream(subscriptions);
      setStream(maxStream);
    }
  }, [subscriptions, setStream]);

  const streamOptions = subscriptions.map(({ stream }) => ({
    value: stream.toString(),
    label: `Поток ${stream}`,
  }));

  return (
    <Select
      options={streamOptions}
      value={stream?.toString()}
      onChange={(evt) => setStream(+evt.target.value)}
    />
  );
}
