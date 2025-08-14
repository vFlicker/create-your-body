import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { hasActiveSubscription } from '~/entities/subscription';
import { useUser } from '~/entities/user';
import { ContinueWorkoutCard } from '~/features/training/continueWorkout';
import { AppRoute } from '~/shared/router';
import { Button } from '~/shared/ui/atoms/Button';
import { HealthTrackerWidget } from '~/widgets/HealthTrackerWidget';
import { CommonPageLayout } from '~/widgets/layouts/CommonPageLayout';
import { MeasurementsWidget } from '~/widgets/MeasurementsWidget';
import { WorkoutDiaryWidget } from '~/widgets/WorkoutDiaryWidget';

import { NoAccessMessage } from './ui/NoAccessMessage';

export function DashboardPage(): JSX.Element {
  const navigate = useNavigate();

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
            <Button
              color="neutral"
              onClick={() => navigate(AppRoute.BmiCalculator)}
            >
              Перейти к калькулятору ИМТ
            </Button>
            <HealthTrackerWidget />
            <MeasurementsWidget />
            <WorkoutDiaryWidget />
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
