import styled from '@emotion/styled';
import { JSX } from 'react';

import {
  DailyReport,
  DailyReportCard,
  TodaysReportCard,
} from '~/entities/dailyReport';
import { useModalStore } from '~/entities/modal';
import EditIcon from '~/shared/assets/svg/pencil.svg?react';
import { formatDateForView } from '~/shared/libs/format';

type ShowDailyReportHistoryProps = {
  report: DailyReport | null;
  reports?: DailyReport[];
  onHealthTrackerButtonClick: () => void;
  onEditButtonClick: (id: number) => void;
};

export function ShowDailyReportHistory({
  reports,
  report,
  onHealthTrackerButtonClick,
  onEditButtonClick,
}: ShowDailyReportHistoryProps): JSX.Element {
  const { openModal } = useModalStore();

  const handleButtonClick = () => {
    openModal(
      <StyledHistoryContent>
        <StyledTitle>Мои показатели</StyledTitle>

        <StyledHealthTrackerWrapper>
          <StyledSubtitle>Сегодня</StyledSubtitle>

          <TodaysReportCard
            report={report}
            onButtonClick={onHealthTrackerButtonClick}
          />
        </StyledHealthTrackerWrapper>

        <StyledHistoryList>
          {reports?.map(({ id, date, ...props }) => (
            <StyledDailyReportCardWrapper key={id}>
              <StyledDailyReportCardHeader>
                <StyledSubtitle>{formatDateForView(date)}</StyledSubtitle>
                <StyledEditButton onClick={() => onEditButtonClick(id)}>
                  Изменить
                  <EditIcon stroke="#8B8B9F" />
                </StyledEditButton>
              </StyledDailyReportCardHeader>
              <DailyReportCard {...props} />
            </StyledDailyReportCardWrapper>
          ))}
        </StyledHistoryList>
      </StyledHistoryContent>,
    );
  };

  return (
    <StyledHistoryButton onClick={handleButtonClick}>
      История
    </StyledHistoryButton>
  );
}

const StyledHistoryContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.h2`
  margin-bottom: 16px;

  color: #0d0d0d;
  font-size: 18px;
  font-weight: 700;
  line-height: 120%;
`;

const StyledHealthTrackerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  margin-bottom: 20px;
`;

const StyledSubtitle = styled.p`
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

const StyledHistoryButton = styled.button`
  color: #7a66ff;
  font-size: 14px;
  font-weight: 600;
  line-height: 120%;
  background: none;
  border: none;
  cursor: pointer;
`;
