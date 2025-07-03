import styled from '@emotion/styled';
import { JSX, useState } from 'react';
import { Link } from 'react-router-dom';

import { ChangeUserLevel } from '~/features/ChangeUserLevel';
import notificationIconSrc from '~/shared/assets/svg/notification.svg';
import { AppRoute } from '~/shared/router';
import { IconButton } from '~/shared/ui/IconButton';
import { Modal } from '~/shared/ui/modal';
import { UserPageLayout } from '~/widgets/UserPageLayout';

export function ProfilePage(): JSX.Element {
  const [showDialogModal, setShowDialogModal] = useState(false);

  return (
    <UserPageLayout
      isLoading={false}
      action={
        <StyledNotificationButton
          color="accent"
          iconSrc={notificationIconSrc}
          isActive
          onClick={() => setShowDialogModal(true)}
        />
      }
    >
      <StyledContentWrapper>
        <ChangeUserLevel />

        <Modal
          isOpen={showDialogModal}
          onClose={() => setShowDialogModal(false)}
        >
          <div>Уведомления</div>
          <div>Сегодня</div>
          <div>
            Текст уведомления чтобы отслеживать прогресс необходимо в конце
            каждой недели обновлять параметры.
          </div>
        </Modal>

        <Link to={AppRoute.ProfileEdit}>Личные данные</Link>
      </StyledContentWrapper>
    </UserPageLayout>
  );
}

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

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
