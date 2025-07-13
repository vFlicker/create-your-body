import styled from '@emotion/styled';
import { isToday } from 'date-fns';
import { JSX } from 'react';

import EditIcon from '~/shared/assets/svg/pencil.svg?react';
import { formatDateForView } from '~/shared/libs/format';
import { Loader } from '~/shared/ui/atoms/Loader';

import { useDailyReports } from '../api/useDailyReports';
import { DailyReportFlatCard } from './DailyReportFlatCard';

type DailyReportHistoryProps = {
  className?: string;
  onEditReportClick: (id: number) => void;
};

export function DailyReportHistory({
  className,
  onEditReportClick,
}: DailyReportHistoryProps): JSX.Element {
  const { dailyReports, isDailyReportsPending } = useDailyReports();

  if (isDailyReportsPending) return <Loader />;

  const reportWithoutToday = dailyReports!.filter(
    ({ date }) => !isToday(new Date(date)),
  );

  return (
    <StyledHistoryList className={className}>
      {reportWithoutToday.map(({ id, date, ...props }) => (
        <StyledDailyReportCardWrapper key={id}>
          <StyledDailyReportCardHeader>
            <StyledTitle>{formatDateForView(date)}</StyledTitle>
            <StyledEditButton onClick={() => onEditReportClick(id)}>
              Изменить
              <EditIcon stroke="#8B8B9F" />
            </StyledEditButton>
          </StyledDailyReportCardHeader>
          <DailyReportFlatCard {...props} />
        </StyledDailyReportCardWrapper>
      ))}
    </StyledHistoryList>
  );
}

const StyledTitle = styled.p`
  color: #8b8b9f;
  font-size: 12px;
  font-weight: 500;
  line-height: 120%;
`;

const StyledHistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledDailyReportCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledDailyReportCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledEditButton = styled.button`
  color: #8b8b9f;
  font-size: 12px;
  font-weight: 500;
  line-height: 120%;
  text-decoration: underline;

  display: flex;
  align-items: center;
  gap: 8px;
`;
