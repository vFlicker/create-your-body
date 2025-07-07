import styled from '@emotion/styled';
import { JSX } from 'react';

import {
  FirstSubscriptionCard,
  PurchaseCard,
  SubscriptionCard,
} from '~/entities/subscription';
import diamondIconSrc from '~/shared/assets/svg/diamond.svg';
import lightningIconSrc from '~/shared/assets/svg/lightning.svg';
import { Button } from '~/shared/ui/atoms/Button';
import { UserPageLayout } from '~/widgets/layouts/UserPageLayout';

export function SubscriptionsPage(): JSX.Element {
  return (
    <UserPageLayout isLoading={false}>
      <StyledContentWrapper>
        <StyledTitle>Все покупки</StyledTitle>

        <StyledPurchaseCardList>
          <StyledText>У вас пока нет приобретённых подписок.</StyledText>
          <PurchaseCard />
          <PurchaseCard />
        </StyledPurchaseCardList>

        <StyledCardList>
          <FirstSubscriptionCard />
          <StyledCardWrapper>
            <SubscriptionCard status="active" />
            <Button color="accent" iconSrc={diamondIconSrc}>
              Повысить до Pro
            </Button>
          </StyledCardWrapper>
          <StyledCardWrapper>
            <SubscriptionCard status="inactive" />
            <Button color="accent" iconSrc={lightningIconSrc}>
              Купить подписку
            </Button>
          </StyledCardWrapper>
        </StyledCardList>
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

const StyledCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
