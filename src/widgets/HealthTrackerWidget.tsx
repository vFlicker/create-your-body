import styled from '@emotion/styled';
import { JSX, useState } from 'react';

import {
  DailyReportCard,
  getTodayReport,
  useDailyReports,
} from '~/entities/dailyReport';
import { useModalStore } from '~/entities/modal';
import { CreateDailyReportForm } from '~/features/dailyReport/createDailyReport';
import { EditDailyReportForm } from '~/features/dailyReport/editDailyReport';
import { ShowDailyReportHistory } from '~/features/dailyReport/showDailyReportHistory';
import { HorizontalDatePicker } from '~/shared/ui/molecules/HorizontalDatePicker';

export function HealthTrackerWidget(): JSX.Element {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { openModal, closeModal } = useModalStore();

  const { dailyReports, isDailyReportsPending } = useDailyReports();

  const todayReport = !isDailyReportsPending
    ? getTodayReport(dailyReports)
    : null;

  const handleHealthTrackerButtonClick = () => {
    if (todayReport) {
      openModal(
        <EditDailyReportForm
          reportId={todayReport.id}
          onFormSubmit={closeModal}
        />,
      );
      return;
    }

    openModal(<CreateDailyReportForm onFormSubmit={closeModal} />);
  };

  const handleEditButtonClick = (id: number) => {
    const report = dailyReports?.find((report) => report.id === id);
    if (report) {
      openModal(
        <EditDailyReportForm reportId={report.id} onFormSubmit={closeModal} />,
      );
    }
  };

  return (
    <>
      <HorizontalDatePicker
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      <StyledHealthTrackerWidget>
        <StyledSectionHeader>
          <StyledSectionTitle>Сегодня</StyledSectionTitle>
          <ShowDailyReportHistory
            reports={dailyReports}
            onHealthTrackerButtonClick={handleHealthTrackerButtonClick}
            onEditButtonClick={handleEditButtonClick}
          />
        </StyledSectionHeader>

        <DailyReportCard onButtonClick={handleHealthTrackerButtonClick} />
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
