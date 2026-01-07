import styled from '@emotion/styled';
import { JSX, useCallback, useEffect, useRef, useState } from 'react';

import { Dialog, useModalStore } from '~/entities/modal';
import { useUpdateUser } from '~/entities/user';
import { Button } from '~/shared/ui/atoms/Button';

type ShowIntroVideoWidgetProps = {
  hasWatchedIntroVideo: boolean;
};

export function ShowIntroVideoWidget({
  hasWatchedIntroVideo,
}: ShowIntroVideoWidgetProps): JSX.Element {
  const { openModal, closeModal } = useModalStore();

  const widgetRef = useRef<HTMLDivElement>(null);
  const shouldRevealHintRef = useRef(false);
  const hasWatchedIntroRef = useRef(hasWatchedIntroVideo);
  const hasAutoOpenedRef = useRef(false);
  const revealTimeoutRef = useRef<number>(5000);
  const [isHintVisible, setIsHintVisible] = useState(false);

  const { updateUser } = useUpdateUser();

  useEffect(() => {
    hasWatchedIntroRef.current = hasWatchedIntroVideo;
  }, [hasWatchedIntroVideo]);

  useEffect(() => {
    if (!isHintVisible) return;

    const timeoutId = window.setTimeout(() => {
      setIsHintVisible(false);
    }, 5000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isHintVisible]);

  useEffect(() => {
    return () => {
      if (revealTimeoutRef.current) {
        window.clearTimeout(revealTimeoutRef.current);
      }
    };
  }, []);

  const handleModalClose = useCallback(() => {
    if (!shouldRevealHintRef.current) return;

    updateUser({ dto: { viewedIntroVideo: true } });

    shouldRevealHintRef.current = false;

    if (revealTimeoutRef.current) {
      window.clearTimeout(revealTimeoutRef.current);
    }

    setIsHintVisible(false);

    revealTimeoutRef.current = window.setTimeout(() => {
      widgetRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      setIsHintVisible(true);
    }, 0);

    if (!hasWatchedIntroRef.current) {
      hasWatchedIntroRef.current = true;
    }
  }, []);

  const openIntroModal = useCallback(() => {
    const shouldReveal = !hasWatchedIntroRef.current;
    shouldRevealHintRef.current = shouldReveal;

    openModal(
      <StyledDialog>
        <StyledDialogContent>
          <StyledTitle>Инструкция по приложению CYB</StyledTitle>
          <StyledVideo
            src="https://kinescope.io/2jnc2LpATwYFeifpgtSnYq"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
            allowFullScreen
          />
          <StyledButton
            color="accent"
            onClick={() => {
              shouldRevealHintRef.current = !hasWatchedIntroRef.current;
              closeModal();
            }}
          >
            Я посмотрела
          </StyledButton>
        </StyledDialogContent>
      </StyledDialog>,
      {
        onClose: handleModalClose,
      },
    );
  }, [closeModal, handleModalClose, openModal]);

  useEffect(() => {
    if (hasWatchedIntroVideo) {
      hasAutoOpenedRef.current = false;
      return;
    }

    if (hasAutoOpenedRef.current) return;

    hasAutoOpenedRef.current = true;
    openIntroModal();
  }, [hasWatchedIntroVideo, openIntroModal]);

  return (
    <StyledShowIntroVideoWidget ref={widgetRef}>
      {isHintVisible && (
        <StyledHint role="status" aria-live="polite">
          Если снова понадобится инструкция - она тут, внизу на главной
        </StyledHint>
      )}
      <StyledTitle>Инструкция по приложению</StyledTitle>
      <Button color="accent" variant="outlined" onClick={openIntroModal}>
        Просмотреть
      </Button>
    </StyledShowIntroVideoWidget>
  );
}

const StyledDialog = styled(Dialog)`
  width: 100%;
  height: 100%;
`;

const StyledShowIntroVideoWidget = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 10px;
`;

const StyledDialogContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
`;

const StyledTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  line-height: 120%;
`;

const StyledVideo = styled.iframe`
  width: 100%;

  border: none;
  border-radius: 14px;

  background-color: #000000;
  aspect-ratio: 16 / 9;

  overflow: hidden;
`;

const StyledHint = styled.div`
  position: fixed;
  right: 20px;
  bottom: 120px;

  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  padding: 10px 16px;
  border-radius: 14px;

  color: #1b1b1f;
  font-size: 14px;
  font-weight: 500;
  line-height: 140%;

  background-color: rgba(127, 76, 255, 0.6);
`;

const StyledButton = styled(Button)`
  margin-top: auto;
`;
