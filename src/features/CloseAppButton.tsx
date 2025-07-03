import { JSX } from 'react';

import { CloseButton } from '~/shared/ui/CloseButton';

type CloseAppButtonProps = {
  className?: string;
};

export function CloseAppButton({
  className,
}: CloseAppButtonProps): JSX.Element {
  return (
    <CloseButton
      className={className}
      onClick={() => Telegram.WebApp.close()}
    />
  );
}
