import styled from '@emotion/styled';
import { JSX } from 'react';

import type { Cms2ContentNode } from '~/entities/cms2';
import { Color } from '~/shared/theme/colors';

type Cms2WeekTabsProps = {
  weeks: Cms2ContentNode[];
  selectedWeek: Cms2ContentNode;
  onSelect: (week: Cms2ContentNode) => void;
};

// Extract week number from title like "Неделя 1" -> "1"
const getWeekNumber = (title: string): string => {
  const match = title.match(/\d+/);
  return match ? match[0] : title;
};

export function Cms2WeekTabs({
  weeks,
  selectedWeek,
  onSelect,
}: Cms2WeekTabsProps): JSX.Element {
  return (
    <StyledWrapper>
      <StyledLabel>Недели</StyledLabel>
      <StyledWeeksScroll>
        {weeks.map((week) => {
          const isSelected = week.id === selectedWeek.id;
          const isDisabled = !week.access.hasAccess;

          return (
            <StyledWeekCircle
              key={week.id}
              $isSelected={isSelected}
              $isDisabled={isDisabled}
              onClick={() => !isDisabled && onSelect(week)}
            >
              {getWeekNumber(week.title)}
            </StyledWeekCircle>
          );
        })}
      </StyledWeeksScroll>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 0 -16px;
  padding: 0 16px;
  overflow: hidden;
`;

const StyledLabel = styled.span`
  flex-shrink: 0;
  font-size: 16px;
  font-weight: 700;
  color: ${Color.Black_950};
`;

const StyledWeeksScroll = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledWeekCircle = styled.button<{
  $isSelected: boolean;
  $isDisabled: boolean;
}>`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 16px;
  font-weight: 600;

  cursor: ${({ $isDisabled }) => ($isDisabled ? 'default' : 'pointer')};
  transition: all 0.2s ease;

  /* Selected: filled violet, white text */
  /* Available: violet outline, violet text */
  /* Disabled: filled gray, white text */
  ${({ $isSelected, $isDisabled }) => {
    if ($isSelected) {
      return `
        background-color: ${Color.Violet_200};
        border: none;
        color: ${Color.White};
      `;
    }
    if ($isDisabled) {
      return `
        background-color: ${Color.Black_100};
        border: none;
        color: ${Color.White};
      `;
    }
    return `
      background-color: transparent;
      border: 2px solid ${Color.Violet_200};
      color: ${Color.Violet_200};
    `;
  }}
`;
