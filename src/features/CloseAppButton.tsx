import { JSX } from 'react';

import { NavButton } from '~/shared/ui/molecules/buttons/NavButton';

type CloseAppButtonProps = {
  className?: string;
};

export function CloseAppButton({
  className,
}: CloseAppButtonProps): JSX.Element {
  const handleClick = () => {
    Telegram.WebApp.close();
  };

  return (
    <NavButton className={className} text="Закрыть" onClick={handleClick} />
  );
}
