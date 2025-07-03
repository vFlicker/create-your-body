import styled from '@emotion/styled';
import { JSX } from 'react';

import { UserPageLayout } from '~/widgets/UserPageLayout';

export function SubscriptionsPage(): JSX.Element {
  return (
    <UserPageLayout isLoading={false}>
      <StyledContentWrapper>Подписки</StyledContentWrapper>
    </UserPageLayout>
  );
}

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
