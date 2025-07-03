import styled from '@emotion/styled';
import { JSX, useState } from 'react';

import { Notification } from '~/entities/notification';
import notificationIconSrc from '~/shared/assets/svg/notification.svg';
import { IconButton } from '~/shared/ui/IconButton';
import { Modal } from '~/shared/ui/modal';

export function ShowNotificationsButton(): JSX.Element {
  const [showDialogModal, setShowDialogModal] = useState(false);

  return (
    <>
      <StyledNotificationButton
        color="accent"
        iconSrc={notificationIconSrc}
        isActive
        onClick={() => setShowDialogModal(true)}
      />

      <Modal isOpen={showDialogModal} onClose={() => setShowDialogModal(false)}>
        <Notification />
      </Modal>
    </>
  );
}

const StyledNotificationButton = styled(IconButton)`
  button {
    width: 40px;
    height: 40px;
  }

  img {
    width: 18px;
    height: 18px;
  }
`;
