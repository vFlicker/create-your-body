import styled from '@emotion/styled';
import { JSX } from 'react';

import { hasActiveSubscription } from '~/entities/subscription';
import { useUser } from '~/entities/user';
import { HealthTrackerHistoryButton } from '~/widgets/HealthTrackerHistoryButton';
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
    >
      <StyledContentWrapper>
        {!hasAccess && <NoAccessMessage />}

        {hasAccess && (
          <StyledWidgetListWrapper>
            <StyledHealthSection>
              <StyledSectionHeader>
                <StyledSectionTitle>Сегодня</StyledSectionTitle>
                <HealthTrackerHistoryButton />
              </StyledSectionHeader>
              <HealthTrackerWidget />
            </StyledHealthSection>
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

const StyledHealthSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledSectionTitle = styled.h2`
  color: #0d0d0d;
  font-size: 18px;
  font-weight: 700;
  line-height: 120%;
  margin: 0;
`;
