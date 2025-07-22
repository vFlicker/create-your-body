import { JSX, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { NavButton } from '~/shared/ui/molecules/buttons/NavButton';

const PREVIOUS_PAGE = -1;

type CloseAppButtonProps = {
  className?: string;
};

export function CloseAppButton({
  className,
}: CloseAppButtonProps): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    const tgBackButton = Telegram.WebApp.BackButton;
    tgBackButton.show();

    const handleBackClick = () => navigate(PREVIOUS_PAGE);
    tgBackButton.onClick(handleBackClick);

    return () => {
      tgBackButton.offClick(handleBackClick);
      tgBackButton.hide();
    };
  }, [navigate]);

  const handleClick = () => {
    Telegram.WebApp.close();
  };

  return (
    <NavButton className={className} text="Закрыть" onClick={handleClick} />
  );
}
