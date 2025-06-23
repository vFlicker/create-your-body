import styled from '@emotion/styled';
import { JSX, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import backIconSrc from '~/shared/assets/svg/back.svg';
import { Color } from '~/shared/theme/colors';

const PREVIOUS_PAGE = -1;

type BackButtonProps = {
  className?: string;
  onClick?: () => void;
};

export function BackButton({
  className,
  onClick,
}: BackButtonProps): JSX.Element {
  const navigate = useNavigate();

  const defaultOnClick = () => navigate(PREVIOUS_PAGE);
  const handleClick = onClick || defaultOnClick;

  useEffect(() => {
    const backButton = Telegram.WebApp.BackButton;
    backButton.show();
    backButton.onClick(handleClick);

    return () => {
      backButton.offClick(handleClick);
      backButton.hide();
    };
  }, [handleClick]);

  return (
    <StyledBackButton className={className} onClick={handleClick}>
      <img src={backIconSrc} />
      Назад
    </StyledBackButton>
  );
}

const StyledBackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;

  height: 28px;
  padding: 0 8px;
  border-radius: 50px;

  color: ${Color.Black_950};
  font-weight: 500;
  font-size: 14px;

  background-color: ${Color.Black_100};

  z-index: 2;
`;
