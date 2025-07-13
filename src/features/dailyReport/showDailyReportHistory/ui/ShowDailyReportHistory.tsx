import styled from '@emotion/styled';
import { JSX } from 'react';

import { DailyReportCard, DailyReportHistory } from '~/entities/dailyReport';
import { useModalStore } from '~/entities/modal';

type ShowDailyReportHistoryProps = {
  onCreateReportClick: () => void;
  onEditReportClick: (id: number) => void;
};

export function ShowDailyReportHistory({
  onCreateReportClick,
  onEditReportClick,
}: ShowDailyReportHistoryProps): JSX.Element {
  const { openModal } = useModalStore();

  const handleButtonClick = () => {
    openModal(
      <StyledHistoryContent>
        <StyledTitle>Мои показатели</StyledTitle>

        <StyledHealthTrackerWrapper>
          <StyledSubtitle>Сегодня</StyledSubtitle>
          <DailyReportCard
            date={new Date()}
            onCreateReportClick={onCreateReportClick}
            onEditReportClick={onEditReportClick}
          />
        </StyledHealthTrackerWrapper>

        <DailyReportHistory onEditReportClick={onEditReportClick} />
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

const StyledHistoryButton = styled.button`
  color: #7a66ff;
  font-size: 14px;
  font-weight: 600;
  line-height: 120%;
  background: none;
  border: none;
  cursor: pointer;
`;
