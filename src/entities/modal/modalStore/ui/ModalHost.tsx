import styled from '@emotion/styled';
import * as Dialog from '@radix-ui/react-dialog';

import { useModalStore } from '../model/modalStore';

export const ModalHost = () => {
  const modals = useModalStore((store) => store.modals);
  const closeModal = useModalStore((store) => store.closeModal);

  return (
    <>
      {modals.map(({ id, component }) => (
        <Dialog.Root
          key={id}
          open
          onOpenChange={(open) => {
            if (!open) closeModal();
          }}
        >
          <Dialog.Portal>
            <Overlay />
            <Content onClick={(evt) => evt.stopPropagation()}>
              {component}
            </Content>
          </Dialog.Portal>
        </Dialog.Root>
      ))}
    </>
  );
};

const Overlay = styled(Dialog.Overlay)`
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  inset: 0;
  z-index: 9998;
`;

const Content = styled(Dialog.Content)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 500px;
  max-width: calc(100vw - 32px);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
`;
