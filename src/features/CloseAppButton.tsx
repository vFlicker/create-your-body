import { JSX, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import closeIconSrc from '~/shared/assets/svg/close.svg';
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
    if (!Telegram.WebApp.isVersionAtLeast('6.1')) {
      return;
    }

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
    <NavButton
      className={className}
      iconSrc={closeIconSrc}
      onClick={handleClick}
    />
  );
}
