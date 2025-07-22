import { JSX, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import backIconSrc from '~/shared/assets/svg/back.svg';
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

  const defaultOnClick = () => navigate(PREVIOUS_PAGE);
  const handleClick = onClick || defaultOnClick;

  useEffect(() => {
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
