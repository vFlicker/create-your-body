import styled from '@emotion/styled';
import { JSX } from 'react';

import { Modal, useModalStore } from '~/entities/modal';
import { Notification } from '~/entities/notification';
import notificationIconSrc from '~/shared/assets/svg/notification.svg';
import { IconButton } from '~/shared/ui/atoms/IconButton';

export function ShowNotificationsButton(): JSX.Element {
  const { openModal } = useModalStore();

  return (
    <>
      <StyledNotificationButton
        color="accent"
        iconSrc={notificationIconSrc}
        isActive
        onClick={() =>
          openModal(
            <Modal>
              <Notification />
            </Modal>,
          )
        }
      />
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
