import { JSX, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import backIconSrc from '~/shared/assets/svg/back.svg';
import { usePersistentBackNavigation } from '~/shared/router';
import { NavButton } from '~/shared/ui/molecules/buttons/NavButton';

const PREVIOUS_PAGE = -1;

type ShowPrevPageButtonProps = {
  className?: string;
  onClick?: () => void;
};

export function ShowPrevPageButton({
  className,
  onClick,
}: ShowPrevPageButtonProps): JSX.Element {
  const navigate = useNavigate();
  const { goBack } = usePersistentBackNavigation();

  const defaultOnClick = useCallback(() => {
    const didGoBack = goBack();
    if (!didGoBack) {
      navigate(PREVIOUS_PAGE);
    }
  }, [goBack, navigate]);

  const handleClick = onClick || defaultOnClick;

  useEffect(() => {
    if (!Telegram.WebApp.isVersionAtLeast('6.1')) {
      return;
    }

    const tgBackButton = Telegram.WebApp.BackButton;
    tgBackButton.show();
    tgBackButton.onClick(handleClick);

    return () => {
      tgBackButton.offClick(handleClick);
      tgBackButton.hide();
    };
  }, [handleClick]);

  return (
    <NavButton
      className={className}
      text="Назад"
      iconSrc={backIconSrc}
      onClick={handleClick}
    />
  );
}
