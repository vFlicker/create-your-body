import { JSX, useEffect } from 'react';

import { NavButton } from '~/shared/ui/molecules/buttons/NavButton';

type CloseAppButtonProps = {
  className?: string;
};

export function CloseAppButton({
  className,
}: CloseAppButtonProps): JSX.Element {
  useEffect(() => {
    const tgBackButton = Telegram.WebApp.BackButton;
    tgBackButton.show();

    return () => {
      tgBackButton.offClick(handleClick);
      tgBackButton.hide();
    };
  }, []);

  const handleClick = () => {
    Telegram.WebApp.close();
  };

  return (
    <NavButton className={className} text="Закрыть" onClick={handleClick} />
  );
}
