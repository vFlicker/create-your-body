import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { useUser } from '~/entities/user';
import { TitleCard } from '~/shared/ui/TitleCard';
import { CommonPageLayout } from '~/widgets/CommonPageLayout';

import { getTitleCards } from './getContainerData';

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, isUserPending } = useUser();

  const pageContainersData = getTitleCards(user.subscriptions);

  return (
    <CommonPageLayout
      title={`Привет, ${user?.name || 'Неизвестный'}!`}
      hasStreamInfo={true}
      isLoading={isUserPending}
    >
      <StyledContentWrapper>
        {/* TODO: we can show History component here */}

        <StyledDashboardList>
          {pageContainersData.map(
            ({ name, icon, closed, buy, to, isHighlight }) => (
              <TitleCard
                key={name}
                title={name}
                labelText={buy && 'Доступно в PRO'}
                labelIconSrc={buy && icon}
                iconSrc={icon}
                disabled={closed !== null || buy}
                isHighlight={isHighlight}
                onClick={() => navigate(to)}
              />
            ),
          )}
        </StyledDashboardList>
      </StyledContentWrapper>
    </CommonPageLayout>
  );
}

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledDashboardList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;
