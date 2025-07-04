import styled from '@emotion/styled';
import { JSX } from 'react';
import { Link } from 'react-router-dom';

import { hasActiveSubscription } from '~/entities/subscription';
import { useUser } from '~/entities/user';
import { AppRoute } from '~/shared/router';
import { CommonPageLayout } from '~/widgets/CommonPageLayout';

import { NoAccessMessage } from './ui/NoAccessMessage';

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

  const hasAccess = hasActiveSubscription(user.subscriptions);

  return (
    <CommonPageLayout
      title={`Привет, ${user.name}!`}
      hasStreamInfo={true}
      hasBackButton={false}
    >
      <StyledContentWrapper>
        {!hasAccess && <NoAccessMessage />}

        {hasAccess && (
          <div>
            {/* TODO: we can show History component here */}

            <div>
              <Link to={AppRoute.Measurements}>Перейти к замерам</Link>
            </div>
          </div>
        )}
      </StyledContentWrapper>
    </CommonPageLayout>
  );
}

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
`;
