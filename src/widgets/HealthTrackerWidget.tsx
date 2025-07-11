import styled from '@emotion/styled';
import { JSX } from 'react';

import { dailyReportsData, HealthTracker } from '~/entities/dailyReport';
import { useModalStore } from '~/entities/modal';
import { CreateDailyReportForm } from '~/features/dailyReport/createDailyReport';
import { ShowDailyReportHistory } from '~/features/dailyReport/showDailyReportHistory';
import { HorizontalDatePicker } from '~/shared/ui/molecules/HorizontalDatePicker';

export function HealthTrackerWidget(): JSX.Element {
  const { openModal } = useModalStore();

  const handleHealthTrackerButtonClick = () => {
    openModal(<CreateDailyReportForm />);
  };

  return (
    <>
      <HorizontalDatePicker />
      <StyledHealthTrackerWidget>
        <StyledSectionHeader>
          <StyledSectionTitle>Сегодня</StyledSectionTitle>
          <ShowDailyReportHistory
            onHealthTrackerButtonClick={handleHealthTrackerButtonClick}
          />
        </StyledSectionHeader>

        <HealthTracker
          onButtonClick={handleHealthTrackerButtonClick}
          data={dailyReportsData[0]}
        />
      </StyledHealthTrackerWidget>
    </>
  );
}

const StyledHealthTrackerWidget = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledSectionTitle = styled.h2`
  color: #0d0d0d;
  font-size: 18px;
  font-weight: 700;
  line-height: 120%;
  margin: 0;
`;
