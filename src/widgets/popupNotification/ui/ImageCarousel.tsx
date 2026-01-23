import styled from '@emotion/styled';
import { JSX, TouchEvent, useRef, useState } from 'react';

import type { PopupNotificationMediaItem } from '~/entities/popupNotification';

type ImageCarouselProps = {
  items: PopupNotificationMediaItem[];
};

export function ImageCarousel({ items }: ImageCarouselProps): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 30;

    if (diff > threshold && currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (diff < -threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (items.length === 0) return <></>;

  const showArrows = items.length > 1;

  return (
    <StyledCarouselContainer>
      <StyledCarouselTrack
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((item, index) => (
          <StyledSlide key={index}>
            <StyledImage src={item.url} alt="" />
          </StyledSlide>
        ))}
      </StyledCarouselTrack>

      {showArrows && currentIndex > 0 && (
        <StyledArrowButton position="left" onClick={goToPrev}>
          <ArrowIcon direction="left" />
        </StyledArrowButton>
      )}

      {showArrows && currentIndex < items.length - 1 && (
        <StyledArrowButton position="right" onClick={goToNext}>
          <ArrowIcon direction="right" />
        </StyledArrowButton>
      )}

      {items.length > 1 && (
        <StyledDots>
          {items.map((_, index) => (
            <StyledDot
              key={index}
              isActive={index === currentIndex}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </StyledDots>
      )}
    </StyledCarouselContainer>
  );
}

function ArrowIcon({
  direction,
}: {
  direction: 'left' | 'right';
}): JSX.Element {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: direction === 'left' ? 'rotate(180deg)' : undefined }}
    >
      <path
        d="M9 18L15 12L9 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const StyledCarouselContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  flex-shrink: 0;
`;

const StyledCarouselTrack = styled.div`
  display: flex;
  height: 100%;
  transition: transform 0.3s ease-out;
  touch-action: pan-y pinch-zoom;
`;

const StyledSlide = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 100%;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
`;

const StyledArrowButton = styled.button<{ position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ position }) => position}: 8px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  color: #0d0d0d;
  cursor: pointer;
  transition: background-color 0.2s;

  &:active {
    background-color: rgba(255, 255, 255, 1);
  }
`;

const StyledDots = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
`;

const StyledDot = styled.button<{ isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  padding: 0;
  cursor: pointer;
  background-color: ${({ isActive }) =>
    isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.5)'};
  transition: background-color 0.2s;
`;
