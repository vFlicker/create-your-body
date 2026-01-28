import styled from '@emotion/styled';
import { Content, Title } from '@radix-ui/react-dialog';
import { JSX, MouseEvent } from 'react';

import backIconSrc from '~/shared/assets/svg/back.svg';
import { CloseButton } from '~/shared/ui/atoms/CloseButton';
import { NavButton } from '~/shared/ui/molecules/buttons/NavButton';

import { useModalStore } from '../model/modalStore';

type ModalProps = {
  children: JSX.Element;
  onBack?: () => void;
  onClose?: () => void;
  title?: string;
  fullScreen?: boolean;
};

export function Modal({
  children,
  onBack,
  onClose,
  title,
  fullScreen,
}: ModalProps): JSX.Element {
  const canGoBack = useModalStore((store) => store.canGoBack);
  const closeAll = useModalStore((store) => store.closeAll);
  const closeModal = useModalStore((store) => store.closeModal);

  const handleModalWrapperClick = (evt: MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
  };

  const handleCloseButtonClick = () => {
    onClose?.();
    closeAll();
  };

  const handleBackButtonClick = () => {
    onBack?.();
    closeModal();
  };

  const Wrapper = fullScreen ? StyledFullScreenModalWrapper : StyledModalWrapper;

  return (
    <Wrapper onClick={handleModalWrapperClick}>
      <StyledVisuallyHiddenTitle>
        {title || 'Модальное окно'}
      </StyledVisuallyHiddenTitle>
      <StyledHeader>
        {canGoBack && (
          <NavButton
            text="Назад"
            iconSrc={backIconSrc}
            onClick={handleBackButtonClick}
          />
        )}
        {title && <StyledHeaderTitle>{title}</StyledHeaderTitle>}
        <StyledCloseButton onClick={handleCloseButtonClick} />
      </StyledHeader>
      <StyledContent>
        <ModalContainer>{children}</ModalContainer>
      </StyledContent>
    </Wrapper>
  );
}

const StyledModalWrapper = styled(Content)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;

  width: 100%;
  height: 80vh;
  height: 80dvh;
  border-radius: 20px 20px 0 0;

  overflow: hidden;
  z-index: 20;

  background-color: #ffffff;

  /* iOS Safari flicking fix */
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);

  @supports (-webkit-touch-callout: none) {
    height: calc(80 * var(--vh, 1vh));
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
`;

const StyledHeader = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  padding: 16px;

  z-index: 2;

  &::after {
    content: '';
    position: absolute;
    bottom: -24px;
    left: 0;
    right: 0;
    height: 24px;

    background: linear-gradient(to bottom, #ffffff, transparent);
    pointer-events: none;
  }
`;

const StyledCloseButton = styled(CloseButton)`
  margin-left: auto;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  padding: 16px 16px 0;

  overflow-y: auto;
`;

const ModalContainer = styled.div`
  padding-bottom: 32px;
`;

const StyledFullScreenModalWrapper = styled(Content)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100vh;
  height: 100dvh;

  overflow: hidden;
  z-index: 20;

  background-color: #ffffff;

  /* iOS Safari flicking fix */
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);

  @supports (-webkit-touch-callout: none) {
    height: calc(100 * var(--vh, 1vh));
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
`;

const StyledVisuallyHiddenTitle = styled(Title)`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const StyledHeaderTitle = styled.h2`
  margin: 0;
  flex: 1;

  color: #0d0d0d;
  font-size: 18px;
  font-weight: 600;
  line-height: 40px;
`;
