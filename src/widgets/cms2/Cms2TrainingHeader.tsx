import styled from '@emotion/styled';
import { JSX, useEffect, useRef, useState } from 'react';

import type { Cms2ContentNode } from '~/entities/cms2';
import { getWeekNumber } from '~/entities/cms2';

type Cms2TrainingHeaderProps = {
  weeks: Cms2ContentNode[];
  selectedWeek: Cms2ContentNode;
  onSelectWeek: (week: Cms2ContentNode) => void;
  showPlaceToggle?: boolean;
  selectedPlace?: string;
  onSelectPlace?: (place: string) => void;
};

export function Cms2TrainingHeader({
  weeks,
  selectedWeek,
  onSelectWeek,
  showPlaceToggle,
  selectedPlace,
  onSelectPlace,
}: Cms2TrainingHeaderProps): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{
    message: string;
    weekId: number;
  } | null>(null);

  // Scroll to selected week
  useEffect(() => {
    if (scrollRef.current) {
      const selectedIndex = weeks.findIndex((w) => w.id === selectedWeek.id);
      const container = scrollRef.current;
      const activeButton = container.children[selectedIndex] as HTMLElement;
      if (activeButton) {
        const scrollLeft = activeButton.offsetLeft - 20;
        container.scrollTo({
          left: Math.max(0, scrollLeft),
          behavior: 'smooth',
        });
      }
    }
  }, [selectedWeek.id, weeks]);

  // Auto-hide tooltip
  useEffect(() => {
    if (tooltip) {
      const timer = setTimeout(() => setTooltip(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [tooltip]);

  const handleWeekClick = (week: Cms2ContentNode) => {
    if (!week.access.hasAccess) {
      const message = week.access.teaserMessage || 'Недоступно';
      setTooltip({ message, weekId: week.id });
    } else {
      setTooltip(null);
      onSelectWeek(week);
    }
  };

  return (
    <StyledOuterWrapper>
      <StyledWrapper>
        <StyledWeeksContainer>
          <StyledWeeksScroll ref={scrollRef}>
            {weeks.map((week) => {
              const isSelected = week.id === selectedWeek.id;
              const isDisabled = !week.access.hasAccess;
              const weekNum = getWeekNumber(week.title);

              return (
                <StyledWeekButton
                  key={week.id}
                  $isSelected={isSelected}
                  $isDisabled={isDisabled}
                  onClick={() => handleWeekClick(week)}
                >
                  {isDisabled && <LockIcon />}
                  {isSelected ? `Неделя ${weekNum}` : weekNum}
                </StyledWeekButton>
              );
            })}
          </StyledWeeksScroll>
        </StyledWeeksContainer>

        {showPlaceToggle && onSelectPlace && (
          <StyledPlaceToggle>
            <StyledPlaceButton
              $isActive={selectedPlace === 'Зал'}
              onClick={() => onSelectPlace('Зал')}
            >
              Зал
            </StyledPlaceButton>
            <StyledPlaceButton
              $isActive={selectedPlace === 'Дом'}
              onClick={() => onSelectPlace('Дом')}
            >
              Дом
            </StyledPlaceButton>
          </StyledPlaceToggle>
        )}
      </StyledWrapper>

      {tooltip && (
        <StyledTooltip onClick={() => setTooltip(null)}>
          {tooltip.message}
        </StyledTooltip>
      )}
    </StyledOuterWrapper>
  );
}

function LockIcon(): JSX.Element {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="11"
        width="18"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M7 11V7a5 5 0 0 1 10 0v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const StyledOuterWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 5;
  margin: -16px -16px 16px -16px;
  background-color: #ffffff;
  border-bottom: 1px solid var(--black-100, #eaeaef);
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
`;

const StyledWeeksContainer = styled.div`
  flex: 1;
  overflow: hidden;
  mask-image: linear-gradient(
    to right,
    transparent,
    black 16px,
    black calc(100% - 16px),
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 16px,
    black calc(100% - 16px),
    transparent
  );
`;

const StyledWeeksScroll = styled.div`
  display: flex;
  gap: 6px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 0 16px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledWeekButton = styled.button<{
  $isSelected: boolean;
  $isDisabled: boolean;
}>`
  flex-shrink: 0;
  min-width: 36px;
  height: 36px;
  padding: ${({ $isSelected, $isDisabled }) => {
    if ($isSelected) return '0 14px';
    if ($isDisabled) return '0 10px';
    return '0';
  }};
  border-radius: 18px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;

  background-color: ${({ $isSelected, $isDisabled }) => {
    if ($isSelected) return 'var(--violet-500, #a799ff)';
    if ($isDisabled) return 'var(--black-100, #eaeaef)';
    return 'var(--black-50, #f5f5f5)';
  }};

  color: ${({ $isSelected, $isDisabled }) => {
    if ($isSelected) return '#ffffff';
    if ($isDisabled) return 'var(--black-400, #999999)';
    return 'var(--black-600, #666666)';
  }};

  &:active {
    transform: scale(0.95);
  }
`;

const StyledTooltip = styled.div`
  position: absolute;
  top: 100%;
  left: 16px;
  right: 16px;
  margin-top: 8px;
  padding: 12px 16px;
  background-color: var(--black-900, #1a1a1a);
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  border-radius: 12px;
  cursor: pointer;
  z-index: 100;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const StyledPlaceToggle = styled.div`
  flex-shrink: 0;
  display: flex;
  background-color: var(--black-50, #f5f5f5);
  border-radius: 10px;
  padding: 4px;
`;

const StyledPlaceButton = styled.button<{ $isActive: boolean }>`
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  background-color: ${({ $isActive }) =>
    $isActive ? 'var(--violet-500, #a799ff)' : 'transparent'};
  color: ${({ $isActive }) =>
    $isActive ? '#ffffff' : 'var(--black-600, #666666)'};

  &:active {
    transform: scale(0.97);
  }
`;
