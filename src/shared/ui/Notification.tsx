import styled from '@emotion/styled';
import { JSX, PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import exit from '~/shared/assets/svg/exit.svg';

import { Color } from '../theme/colors';

const DEFAULT_DURATION = 5000;

type NotificationProps = PropsWithChildren<{
  duration?: number;
}>;

export function Notification({
  children,
  duration = DEFAULT_DURATION,
}: NotificationProps): JSX.Element {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearTimeout(timerId);
    };
  }, [duration]);

  const handleCloseClick = () => setIsVisible(false);

  if (!isVisible) return null;

  return createPortal(
    <StyledNotificationWrapper>
      {children}
      <StyledCloseButton onClick={handleCloseClick}>
        <img src={exit} alt="Убрать сообщение" />
      </StyledCloseButton>
    </StyledNotificationWrapper>,
    document.body,
  );
}

const StyledNotificationWrapper = styled.div`
  position: fixed;
  top: 70px;
  left: 50%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  width: 90%;
  padding: 16px 16px;
  border-radius: 16px;

  font-size: 13px;
  font-weight: 700;
  color: #ffffff;

  background-color: ${Color.Black};

  transform: translateX(-50%);
  animation: fadeIn 5s ease-in-out forwards;

  @keyframes fadeIn {
    0% {
      top: -100%;
    }

    25% {
      top: 80px;
    }

    35% {
      top: 70px;
    }

    50% {
      top: 70px;
    }

    75% {
      top: 70px;
    }

    100% {
      top: -100%;
    }
  }
`;

const StyledCloseButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 50px;
  background-color: ${Color.White};
`;
