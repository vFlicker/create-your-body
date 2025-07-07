import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from '~/entities/user';
import { TitleCard } from '~/shared/ui/molecules/TitleCard';
import { CommonPageLayout } from '~/widgets/layouts/CommonPageLayout';

import { getTitleCards } from './getContainerData';

export function LearningPage(): JSX.Element {
  const navigate = useNavigate();
  const { user, isUserPending } = useUser();

  if (!user || isUserPending)
    return (
      <CommonPageLayout
        title="Обучение"
        hasStreamInfo={true}
        isLoading={isUserPending}
      />
    );

  const pageContainersData = getTitleCards(user.subscriptions);

  return (
    <CommonPageLayout
      title="Обучение"
      hasStreamInfo={true}
      hasBackButton={false}
    >
      <StyledContentWrapper>
        {/* TODO: we can show History component here */}

        <StyledDashboardList>
          {pageContainersData.map(({ title, to, ...props }) => (
            <TitleCard
              key={title}
              title={title}
              onClick={() => navigate(to)}
              {...props}
            />
          ))}
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
