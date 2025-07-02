import styled from '@emotion/styled';
import { JSX } from 'react';

import { EditProfileForm } from '~/features/user';
import { UserPageLayout } from '~/widgets/UserPageLayout';

export function ProfileEditPage(): JSX.Element {
  return (
    <UserPageLayout isLoading={false}>
      <StyledProfileEditPageWrapper>
        <StyledTitle>Личные данные</StyledTitle>
        <EditProfileForm />
      </StyledProfileEditPageWrapper>
    </UserPageLayout>
  );
}

const StyledProfileEditPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 16px;
`;

const StyledTitle = styled.h3`
  color: #0d0d0d;
  font-size: 18px;
  font-weight: 700;
`;
