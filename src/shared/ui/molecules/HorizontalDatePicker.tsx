import styled from '@emotion/styled';
import { addDays, format, startOfWeek } from 'date-fns';
import { ru } from 'date-fns/locale';
import { JSX, useState } from 'react';

import CalendarIcon from '~/shared/assets/svg/calendar.svg?react';
import ChevronLeftIcon from '~/shared/assets/svg/chevron-left.svg?react';
import ChevronRightIcon from '~/shared/assets/svg/chevron-right.svg?react';
import { capitalize } from '~/shared/libs/format';

const weekdays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

type HorizontalDatePickerProps = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
};

export function HorizontalDatePicker({
  selectedDate,
  onDateChange,
}: HorizontalDatePickerProps): JSX.Element {
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 }),
  );

  const days = Array.from({ length: 7 }).map((_, i) =>
    addDays(currentWeekStart, i),
  );

  const titleDate = format(currentWeekStart, 'LLLL yyyy', { locale: ru });
  const [month, year] = titleDate.split(' ');

  return (
    <HorizontalDatePickerWrapper>
      <StyledHeader>
        <StyledIconButton
          onClick={() => setCurrentWeekStart(addDays(currentWeekStart, -7))}
        >
          <ChevronLeftIcon />
        </StyledIconButton>
        <StyledTitle>
          <CalendarIcon />
          {capitalize(month)} {year}
        </StyledTitle>
        <StyledIconButton
          onClick={() => setCurrentWeekStart(addDays(currentWeekStart, 7))}
        >
          <ChevronRightIcon />
        </StyledIconButton>
      </StyledHeader>

      <StyledDaysWrapper>
        {days.map((date, i) => {
          const isSelected =
            format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
          const isDisabled = date > new Date();

          return (
            <StyledDayCell
              key={i}
              isDisabled={isDisabled}
              onClick={() => {
                if (isDisabled) return;
                onDateChange(date);
              }}
            >
              <StyledDayNumber selected={isSelected}>
                {format(date, 'd')}
              </StyledDayNumber>
              <StyledDayLabel>{weekdays[i]}</StyledDayLabel>
            </StyledDayCell>
          );
        })}
      </StyledDaysWrapper>
    </HorizontalDatePickerWrapper>
  );
}

const HorizontalDatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  stroke: #7a66ff;
`;

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  color: #0d0d0d;
  font-size: 12px;
  font-weight: 600;
  line-height: 120%;
`;

const StyledIconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 4px;
`;

const StyledDaysWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledDayCell = styled.div<{ isDisabled: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
`;

const StyledDayNumber = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 42px;
  height: 42px;

  border-radius: 50%;
  box-shadow: ${({ selected }) =>
    selected ? '0 0 0 2px #ffffff, 0 0 0 3px #7A66FF' : 'none'};

  color: ${({ selected }) => (selected ? '#ffffff' : '#7A66FF')};
  font-size: 12px;
  font-weight: 600;
  line-height: 120%;

  background-color: ${({ selected }) => (selected ? '#7A66FF' : '#F2F1FF')};
`;

const StyledDayLabel = styled.div`
  color: #8b8b9f;
  font-size: 10px;
  font-weight: 500;
  line-height: 120%;
`;
