import styled from '@emotion/styled';
import { JSX, PropsWithChildren, useEffect, useRef } from 'react';

import { Color } from '~/shared/theme/colors';

import { CloseButton } from '../CloseButton';
import { ReactPortal } from './ReactPortal';

type ModalProps = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
}>;

export function Modal({ children, isOpen, onClose }: ModalProps): JSX.Element {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;
    if (isOpen) modal.showModal();
    else modal.close();
  }, [isOpen]);

  return (
    <ReactPortal wrapperId="dialog-modal-container">
      <StyledDialog ref={modalRef} onClose={onClose}>
        <StyledHeader>
          <StyledCloseButton onClick={onClose} />
        </StyledHeader>
        <StyledModalContent>{children}</StyledModalContent>
      </StyledDialog>
    </ReactPortal>
  );
}

const StyledDialog = styled.dialog`
  position: relative;

  display: none;
  flex-direction: column;
  gap: 24px;

  width: 100%;
  max-width: 100%;
  height: 80%;
  margin-top: auto;
  border: none;
  border-radius: 20px 20px 0 0;

  background-color: ${Color.White};

  &[open] {
    display: flex;
  }

  &::backdrop {
    background-color: rgba(0, 0, 0, 0);
  }

  &[open]::backdrop {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

const StyledHeader = styled.div`
  position: fixed;

  display: flex;
  width: 100%;
  padding: 23px 16px 16px 16px;
  border-radius: 20px 20px 0 0;

  background-color: ${Color.White};
  z-index: 2;
`;

const StyledCloseButton = styled(CloseButton)`
  margin-left: auto;
`;

const StyledModalContent = styled.div`
  padding: 16px;
  margin-top: 61px;
`;
