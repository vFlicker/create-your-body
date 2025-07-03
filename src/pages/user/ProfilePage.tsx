import styled from '@emotion/styled';
import { JSX } from 'react';
import { Link } from 'react-router-dom';

import { ChangeUserLevel } from '~/features/ChangeUserLevel';
import { AppRoute } from '~/shared/router';
import { UserPageLayout } from '~/widgets/UserPageLayout';

export function ProfilePage(): JSX.Element {
  return (
    <UserPageLayout isLoading={false}>
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
