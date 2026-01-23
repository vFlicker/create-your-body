import styled from '@emotion/styled';
import { JSX, useEffect, useRef } from 'react';

type LessonStepNavigationProps = {
  currentIndex: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
  onPageSelect: (index: number) => void;
};

export function LessonStepNavigation({
  currentIndex,
  totalPages,
  onPrev,
  onNext,
  onFinish,
  onPageSelect,
}: LessonStepNavigationProps): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isFirstPage = currentIndex === 0;
  const isLastPage = currentIndex === totalPages - 1;

  // Scroll to keep active dot visible
  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const activeButton = container.children[currentIndex] as HTMLElement;
      if (activeButton) {
        const containerWidth = container.offsetWidth;
        const buttonLeft = activeButton.offsetLeft;
        const buttonWidth = activeButton.offsetWidth;
        const scrollLeft = buttonLeft - containerWidth / 2 + buttonWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [currentIndex]);

  return (
    <StyledWrapper>
      <StyledNavButton onClick={onPrev} disabled={isFirstPage}>
        <ArrowIcon direction="left" />
      </StyledNavButton>

      <StyledDotsContainer>
        <StyledDotsScroll ref={scrollRef}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <StyledDot
              key={index}
              isActive={index === currentIndex}
              onClick={() => onPageSelect(index)}
            >
              {index + 1}
            </StyledDot>
          ))}
        </StyledDotsScroll>
      </StyledDotsContainer>

      <StyledNextButton onClick={isLastPage ? onFinish : onNext}>
        {isLastPage ? 'Завершить' : 'Дальше'}
      </StyledNextButton>
    </StyledWrapper>
  );
}

function ArrowIcon({
  direction,
}: {
  direction: 'left' | 'right';
}): JSX.Element {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: direction === 'left' ? 'rotate(180deg)' : undefined }}
    >
      <path
        d="M9 18L15 12L9 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const StyledWrapper = styled.div`
  position: fixed;
  bottom: 105px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background-color: #ffffff;
  border-top: 1px solid var(--black-100, #eaeaef);
  z-index: 10;
`;

const StyledNavButton = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background-color: var(--black-100, #eaeaef);
  color: var(--black-950, #0d0d0d);
  cursor: pointer;
  transition:
    background-color 0.2s,
    opacity 0.2s;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &:not(:disabled):active {
    background-color: var(--black-200, #d4d4d8);
  }
`;

const StyledDotsContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  mask-image: linear-gradient(
    to right,
    transparent,
    black 20px,
    black calc(100% - 20px),
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 20px,
    black calc(100% - 20px),
    transparent
  );
`;

const StyledDotsScroll = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 4px 20px;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledDot = styled.button<{ isActive: boolean }>`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background-color: ${({ isActive }) =>
    isActive ? 'var(--violet-500, #a799ff)' : 'var(--black-100, #eaeaef)'};
  color: ${({ isActive }) =>
    isActive ? '#ffffff' : 'var(--black-600, #666666)'};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.2s,
    color 0.2s;

  &:active {
    background-color: ${({ isActive }) =>
      isActive ? 'var(--violet-600, #8b7ae6)' : 'var(--black-200, #d4d4d8)'};
  }
`;

const StyledNextButton = styled.button`
  flex-shrink: 0;
  min-width: 90px;
  padding: 10px 16px;
  border: none;
  border-radius: 10px;
  background-color: var(--violet-500, #a799ff);
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:active {
    background-color: var(--violet-600, #8b7ae6);
  }
`;
