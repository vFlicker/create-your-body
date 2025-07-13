import styled from '@emotion/styled';
import { JSX } from 'react';

import { hasActiveSubscription } from '~/entities/subscription';
import { useUser } from '~/entities/user';
import { ContinueWorkoutCard } from '~/features/training/continueWorkout';
import { HealthTrackerWidget } from '~/widgets/HealthTrackerWidget';
import { CommonPageLayout } from '~/widgets/layouts/CommonPageLayout';
import { MeasurementsWidget } from '~/widgets/MeasurementsWidget';

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
      component={hasAccess ? <ContinueWorkoutCard /> : <></>}
    >
      <StyledContentWrapper>
        {!hasAccess && <NoAccessMessage />}

        {hasAccess && (
          <StyledWidgetListWrapper>
            <HealthTrackerWidget />
            <MeasurementsWidget />
          </StyledWidgetListWrapper>
        )}
      </StyledContentWrapper>
    </CommonPageLayout>
  );
}

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const StyledWidgetListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
