import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCms2Products } from '~/entities/cms2';
import { useUser } from '~/entities/user';
import bookIconSrc from '~/shared/assets/svg/book.svg';
import { AppRoute } from '~/shared/router';
import { Color } from '~/shared/theme/colors';
import { CommonPageLayout } from '~/widgets/layouts/CommonPageLayout';

export function LearningPage(): JSX.Element {
  const navigate = useNavigate();
  const { user, isUserPending } = useUser();
  const { products, isProductsPending } = useCms2Products();

  const isLoading = isUserPending || isProductsPending;

  if (!user || isLoading) {
    return <CommonPageLayout title="Обучение" isLoading={isLoading} />;
  }

  const handleProductClick = (productId: number) => {
    navigate(
      AppRoute.LearningProduct.replace(':productId', String(productId)),
    );
  };

  // Deduplicate products by id (user may have multiple subscriptions for same product)
  const uniqueProducts = products?.filter(
    (product, index, self) =>
      index === self.findIndex((p) => p.id === product.id),
  );

  return (
    <CommonPageLayout title="Обучение">
      <StyledContentWrapper>
        <StyledProductsList>
          {uniqueProducts?.map((product) => {
            const isPro = product.subscription.plan === 'Pro';

            return (
              <StyledProductCard
                key={product.id}
                $isPro={isPro}
                onClick={() => handleProductClick(product.id)}
              >
                {isPro && <StyledBadge>Pro</StyledBadge>}
                <StyledIcon src={bookIconSrc} alt="" />
                <StyledTitle>{product.title}</StyledTitle>
              </StyledProductCard>
            );
          })}
        </StyledProductsList>
      </StyledContentWrapper>
    </CommonPageLayout>
  );
}

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledProductsList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const StyledProductCard = styled.div<{ $isPro: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;

  min-height: 110px;
  padding: 16px;
  border: 1px solid;
  border-radius: 14px;
  border-color: ${({ $isPro }) =>
    $isPro ? Color.Violet_100 : Color.Black_100};
  background-color: #fafafa;

  cursor: pointer;
`;

const StyledBadge = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 4px 8px;
  border-radius: 45px;

  color: #ffffff;
  font-weight: 600;
  font-size: 10px;

  background-color: ${Color.Violet_100};
`;

const StyledIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const StyledTitle = styled.h2`
  font-weight: 700;
  font-size: 14px;
  color: ${Color.Black_950};
`;
