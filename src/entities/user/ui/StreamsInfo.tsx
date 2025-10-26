import styled from '@emotion/styled';
import { JSX } from 'react';

import { Chip } from '~/shared/ui/atoms/Chip';

import { useUser } from '../api/useUser';

export function StreamsInfo(): JSX.Element | null {
  const { user } = useUser();
  if (!user) return null;

  const { subscriptions } = user;

  const steam4 = subscriptions.find((sub) => sub.stream === 4);
  const steam2025 = subscriptions.find((sub) => sub.stream === 2025);

  if (!steam4 && !steam2025) return <></>;

  if (steam4 && !steam2025) {
    return (
      <StyledDashLabelsWrapper>
        <Chip color="secondary">Поток 4</Chip>
      </StyledDashLabelsWrapper>
    );
  }

  if (!steam4 && steam2025) {
    return (
      <StyledDashLabelsWrapper>
        <Chip color="accent">Поток 2025</Chip>
      </StyledDashLabelsWrapper>
    );
  }

  return (
    <StyledDashLabelsWrapper>
      <Chip color="secondary">Поток 4</Chip>
      <Chip color="accent">Поток 2025</Chip>
    </StyledDashLabelsWrapper>
  );
}

const StyledDashLabelsWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
