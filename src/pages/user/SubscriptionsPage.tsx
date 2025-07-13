import styled from '@emotion/styled';
import { JSX } from 'react';

import { PurchaseCard, useSubscriptions } from '~/entities/subscription';
import { UserPageLayout } from '~/widgets/layouts/UserPageLayout';

export function SubscriptionsPage(): JSX.Element {
  const { subscriptions, isSubscriptionsPending } = useSubscriptions();

  if (!subscriptions || isSubscriptionsPending) {
    return <UserPageLayout isLoading={isSubscriptionsPending} />;
  }

  const hasSubscriptions = subscriptions.length > 0;

  console.log({ subscriptions });

  return (
    <UserPageLayout isLoading={false}>
      <StyledContentWrapper>
        <StyledTitle>Все покупки</StyledTitle>

        {!hasSubscriptions && (
          <StyledText>У вас пока нет приобретённых подписок.</StyledText>
        )}

        {hasSubscriptions && (
          <StyledPurchaseCardList>
            {subscriptions.map((subscription) => (
              <PurchaseCard key={subscription.id} {...subscription} />
            ))}
          </StyledPurchaseCardList>
        )}
      </StyledContentWrapper>
    </UserPageLayout>
  );
}

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.h1`
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: 700;
`;

const StyledPurchaseCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  margin-bottom: 16px;
`;

const StyledText = styled.p`
  color: #797996;
  font-size: 12px;
`;
