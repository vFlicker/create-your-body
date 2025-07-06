import styled from '@emotion/styled';
import { JSX } from 'react';

import { MeasurementsChart } from '~/entities/measurement';
import { hasActiveSubscription } from '~/entities/subscription';
import { useUser } from '~/entities/user';
import plusIconSrc from '~/shared/assets/svg/plus.svg';
import { AppRoute } from '~/shared/router';
import { ButtonLink } from '~/shared/ui/atoms/Button';
import { IconButton } from '~/shared/ui/atoms/IconButton';
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

            <StyledMeasurementsWidget>
              <MeasurementsChart />
              <StyledMeasurementsActionWrapper>
                <ButtonLink
                  color="accent"
                  variant="outlined"
                  to={AppRoute.Measurements}
                >
                  Перейти к замерам
                </ButtonLink>
                <StyledAddMeasurementButton
                  color="accent"
                  iconSrc={plusIconSrc}
                  isActive
                />
              </StyledMeasurementsActionWrapper>
            </StyledMeasurementsWidget>
          </div>
        )}
      </StyledContentWrapper>
    </CommonPageLayout>
  );
}

const StyledMeasurementsWidget = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledMeasurementsActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
`;

const StyledAddMeasurementButton = styled(IconButton)`
  button {
    width: 54px;
    height: 54px;
  }
`;
