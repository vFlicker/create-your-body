import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStreamStore, useUser } from '~/entities/user';
import { SelectStream } from '~/features/SelectStream';
import { TitleCard } from '~/shared/ui/molecules/TitleCard';
import { CommonPageLayout } from '~/widgets/layouts/CommonPageLayout';

import { getTitleCards } from './getTitleCards';

export function LearningPage(): JSX.Element {
  const navigate = useNavigate();
  const { user, isUserPending } = useUser();
  const { selectedStream } = useStreamStore();

  if (!user || isUserPending)
    return <CommonPageLayout title="Обучение" isLoading={isUserPending} />;

  const pageContainersData = getTitleCards(user.subscriptions, selectedStream);

  return (
    <CommonPageLayout title="Обучение" action={<SelectStream />}>
      <StyledContentWrapper>
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
