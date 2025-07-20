import styled from '@emotion/styled';
import { isToday } from 'date-fns';
import { JSX, useState } from 'react';

import { DailyReportCard } from '~/entities/dailyReport';
import { Modal, useModalStore } from '~/entities/modal';
import { CreateDailyReportForm } from '~/features/dailyReport/createDailyReport';
import { EditDailyReportForm } from '~/features/dailyReport/editDailyReport';
import { ShowDailyReportHistory } from '~/features/dailyReport/showDailyReportHistory';
import { formatDateToLocaleRu } from '~/shared/libs/format';
import { HorizontalDatePicker } from '~/shared/ui/molecules/HorizontalDatePicker';

export function HealthTrackerWidget(): JSX.Element {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { openModal, closeModal } = useModalStore();

  // We should use the handlers here
  // because ShowDailyReportHistory feature can't include another feature
  const handleCreateReportClick = (date: Date) => {
    openModal(
      <Modal>
        <CreateDailyReportForm date={date} onFormSubmit={closeModal} />
      </Modal>,
    );
  };

  const handleUpdateReportClick = (id: number) => {
    openModal(
      <Modal>
        <EditDailyReportForm reportId={id} onFormSubmit={closeModal} />
      </Modal>,
    );
  };

  const title = isToday(selectedDate)
    ? 'Сегодня'
    : formatDateToLocaleRu(selectedDate);

  return (
    <StyledHealthTrackerWrapper>
      <HorizontalDatePicker
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      <DailyReportCardWrapper>
        <StyledHeader>
          <StyledTitle>{title}</StyledTitle>
          <ShowDailyReportHistory
            onCreateReportClick={handleCreateReportClick}
            onEditReportClick={handleUpdateReportClick}
          />
        </StyledHeader>

        <DailyReportCard
          date={selectedDate}
          onCreateReportClick={handleCreateReportClick}
          onEditReportClick={handleUpdateReportClick}
        />
      </DailyReportCardWrapper>
    </StyledHealthTrackerWrapper>
  );
}

const StyledHealthTrackerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DailyReportCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledTitle = styled.h2`
  color: #0d0d0d;
  font-size: 18px;
  font-weight: 700;
  line-height: 120%;
  margin: 0;
`;
