import styled from '@emotion/styled';
import { Overlay, Portal, Root } from '@radix-ui/react-dialog';
import { JSX } from 'react';

import { useModalStore } from '../model/modalStore';

export function ModalHost(): JSX.Element {
  const modals = useModalStore((store) => store.modals);
  const closeModal = useModalStore((store) => store.closeModal);

  const handleOpenChange = (open: boolean) => {
    if (!open) closeModal();
  };

  return (
    <>
      {modals.map(({ id, component }) => (
        <Root key={id} open onOpenChange={handleOpenChange}>
          <Portal>
            <StyledOverlay />
            {component}
          </Portal>
        </Root>
      ))}
    </>
  );
}

const StyledOverlay = styled(Overlay)`
  position: fixed;
  inset: 0;

  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  z-index: 10;

  &[data-state='open'] {
    animation: overlayFadeIn 0.2s ease-out;
  }

  &[data-state='closed'] {
    animation: overlayFadeOut 0.15s ease-in;
  }

  @keyframes overlayFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes overlayFadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
