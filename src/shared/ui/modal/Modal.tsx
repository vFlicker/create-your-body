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
        <StyledCloseButton onClick={onClose} />
        <StyledModalContent>{children}</StyledModalContent>
      </StyledDialog>
    </ReactPortal>
  );
}

const StyledDialog = styled.dialog`
  display: flex;
  flex-direction: column;
  gap: 24px;

  width: 100%;
  max-width: 100%;
  height: 80%;
  margin-top: auto;
  padding: 16px;
  border: none;
  border-radius: 20px 20px 0 0;

  background-color: ${Color.White};

  opacity: 0;
  pointer-events: none;

  &[open] {
    opacity: 1;
    pointer-events: auto;
  }

  &::backdrop {
    background-color: rgba(0, 0, 0, 0);
  }

  &[open]::backdrop {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

const StyledCloseButton = styled(CloseButton)`
  margin-left: auto;
`;

const StyledModalContent = styled.div``;
