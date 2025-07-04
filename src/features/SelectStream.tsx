import { JSX, useEffect } from 'react';

import { getMaxStream, useStreamStore, useUser } from '~/entities/user';
import { Select } from '~/shared/ui/atoms/Select';

export function SelectStream(): JSX.Element | null {
  const { user, isUserPending } = useUser();
  const { stream, setStream } = useStreamStore();

  useEffect(() => {
    const subscriptions = user?.subscriptions;

    if (!stream && subscriptions && subscriptions.length > 0) {
      const streams = subscriptions.map(({ stream }) => stream);
      const maxStream = getMaxStream(streams);
      setStream(maxStream);
    }
  }, [user, stream, setStream]);

  if (isUserPending || !user?.subscriptions) {
    return null;
  }

  const streamOptions = user.subscriptions.map(({ stream }) => ({
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
