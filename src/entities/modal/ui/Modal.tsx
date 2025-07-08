import styled from '@emotion/styled';
import { Content } from '@radix-ui/react-dialog';
import { JSX, MouseEvent } from 'react';

import { CloseButton } from '~/shared/ui/atoms/CloseButton';
import { BackButton } from '~/shared/ui/molecules/BackButton';

import { useModalStore } from '../model/modalStore';

type ModalProps = {
  children: JSX.Element;
  canGoBack?: boolean;
  onClose?: () => void;
};

export function Modal({
  children,
  canGoBack,
  onClose,
}: ModalProps): JSX.Element {
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
    closeModal();
  };

  return (
    <StyledModalWrapper onClick={handleModalWrapperClick}>
      <StyledHeader>
        {canGoBack && <BackButton onClick={handleBackButtonClick} />}
        <StyledCloseButton onClick={handleCloseButtonClick} />
      </StyledHeader>
      <StyledContent>{children}</StyledContent>
    </StyledModalWrapper>
  );
}

const StyledModalWrapper = styled(Content)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  gap: 30px;

  width: 100%;
  height: 80%;
  padding: 16px;
  border-radius: 20px 20px 0 0;

  background-color: #ffffff;

  z-index: 20;
`;

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  border-radius: 20px 20px 0 0;

  background-color: #ffffff;
  z-index: 2;
`;

const StyledCloseButton = styled(CloseButton)`
  margin-left: auto;
`;

const StyledContent = styled.div`
  overflow-y: auto;
`;
