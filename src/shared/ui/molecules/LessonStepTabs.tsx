import styled from '@emotion/styled';
import { JSX, useEffect, useRef } from 'react';

type LessonStepTabsProps = {
  pages: { id: string; title: string }[];
  currentIndex: number;
  onSelect: (index: number) => void;
};

export function LessonStepTabs({
  pages,
  currentIndex,
  onSelect,
}: LessonStepTabsProps): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to keep active tab visible
  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const activeTab = container.children[currentIndex] as HTMLElement;
      if (activeTab) {
        const containerWidth = container.offsetWidth;
        const tabLeft = activeTab.offsetLeft;
        const tabWidth = activeTab.offsetWidth;
        const scrollLeft = tabLeft - containerWidth / 2 + tabWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [currentIndex]);

  return (
    <StyledWrapper>
      <StyledTabsContainer>
        <StyledTabsScroll ref={scrollRef}>
          {pages.map((page, index) => (
            <StyledTab
              key={page.id}
              isActive={index === currentIndex}
              onClick={() => onSelect(index)}
            >
              {page.title || `Шаг ${index + 1}`}
            </StyledTab>
          ))}
        </StyledTabsScroll>
      </StyledTabsContainer>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #ffffff;
  border-bottom: 1px solid var(--black-100, #eaeaef);
  margin: -16px -16px 16px -16px;
  padding: 0;
`;

const StyledTabsContainer = styled.div`
  position: relative;
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

const StyledTabsScroll = styled.div`
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding: 12px 20px;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledTab = styled.button<{ isActive: boolean }>`
  flex-shrink: 0;
  padding: 8px 16px;
  border: none;
  border-radius: 12px;
  background-color: ${({ isActive }) =>
    isActive ? 'var(--violet-500, #a799ff)' : 'var(--black-100, #eaeaef)'};
  color: ${({ isActive }) =>
    isActive ? '#ffffff' : 'var(--black-600, #666666)'};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 0.2s,
    color 0.2s;
  white-space: nowrap;

  &:active {
    background-color: ${({ isActive }) =>
      isActive ? 'var(--violet-600, #8b7ae6)' : 'var(--black-200, #d4d4d8)'};
  }
`;
