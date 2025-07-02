import styled from '@emotion/styled';
import { JSX } from 'react';
import { Link } from 'react-router-dom';

import { ChangeUserLevel } from '~/features/ChangeUserLevel';
import notificationIconSrc from '~/shared/assets/svg/notification.svg';
import { AppRoute } from '~/shared/router';
import { IconButton } from '~/shared/ui/IconButton';
import { UserPageLayout } from '~/widgets/UserPageLayout';

export function ProfilePage(): JSX.Element {
  return (
    <UserPageLayout
      isLoading={false}
      action={
        <StyledNotificationButton
          color="accent"
          iconSrc={notificationIconSrc}
          isActive
        />
      }
    >
      <StyledContentWrapper>
        <ChangeUserLevel />

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
