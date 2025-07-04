import styled from '@emotion/styled';
import { JSX } from 'react';

import { useUser } from '~/entities/user';
import { CommonPageLayout } from '~/widgets/CommonPageLayout';

export function DashboardPage(): JSX.Element {
  const { user, isUserPending } = useUser();

  if (!user || isUserPending)
    return (
      <CommonPageLayout
        title="Добро пожаловать!"
        hasStreamInfo={true}
        isLoading={isUserPending}
      />
    );

  return (
    <CommonPageLayout
      title={`Привет, ${user.name}!`}
      hasStreamInfo={true}
      hasBackButton={false}
    >
      <StyledContentWrapper>
        {/* TODO: we can show History component here */}
        Тут будут виджеты с информацией о тренировках, питании и т.д.
      </StyledContentWrapper>
    </CommonPageLayout>
  );
}

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
