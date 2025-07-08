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

  background-color: rgba(0, 0, 0, 0.15);

  z-index: 10;
`;
