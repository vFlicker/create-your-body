import styled from '@emotion/styled';
import { JSX } from 'react';

import defaultFolderCover from '~/shared/assets/img/default-folder-cover.png';
import defaultLessonCover from '~/shared/assets/img/default-lesson-cover.png';

type Cms2NodeCardProps = {
  title: string;
  type: 'folder' | 'lesson';
  coverImage?: string | null;
  disabled?: boolean;
  badgeText?: string;
  isCompleted?: boolean;
  hasTypeBadge?: boolean;
  onClick?: () => void;
};

export function Cms2NodeCard({
  title,
  type,
  coverImage,
  disabled,
  badgeText,
  isCompleted,
  hasTypeBadge = true,
  onClick,
}: Cms2NodeCardProps): JSX.Element {
  const defaultCover =
    type === 'folder' ? defaultFolderCover : defaultLessonCover;
  const imageSrc = coverImage || defaultCover;

  return (
    <StyledCardWrapper>
      {badgeText && <StyledTeaserBadge>{badgeText}</StyledTeaserBadge>}
      {!badgeText && isCompleted && (
        <StyledCheckmark>
          <CheckIcon />
        </StyledCheckmark>
      )}
      <StyledCard onClick={disabled ? undefined : onClick} disabled={disabled}>
        <StyledCoverWrapper disabled={disabled}>
          <StyledCover src={imageSrc} alt="" />
          {hasTypeBadge && (
            <StyledTypeBadge>
              {type === 'folder' ? 'Раздел' : 'Урок'}
            </StyledTypeBadge>
          )}
        </StyledCoverWrapper>
        <StyledContent disabled={disabled}>
          <StyledTitle>{title}</StyledTitle>
        </StyledContent>
      </StyledCard>
    </StyledCardWrapper>
  );
}

function CheckIcon(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M13.3 4.3L6 11.6L2.7 8.3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const StyledCardWrapper = styled.div`
  position: relative;
`;

const StyledCard = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 80px;
  padding: 0;
  border: 1px solid var(--black-100, #eaeaef);
  border-radius: 14px;
  background-color: #fafafa;
  text-align: left;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  overflow: hidden;
  transition: background-color 0.2s;

  &:active {
    background-color: ${({ disabled }) => (disabled ? '#fafafa' : '#f0f0f0')};
  }
`;

const StyledCoverWrapper = styled.div<{ disabled?: boolean }>`
  position: relative;
  flex-shrink: 0;
  width: 80px;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const StyledCover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledTypeBadge = styled.span`
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  padding: 3px 6px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.95);
  font-size: 10px;
  font-weight: 600;
  color: var(--black-950, #0d0d0d);
`;

const StyledContent = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex: 1;
  align-items: center;
  padding: 16px;
  min-width: 0;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const StyledTitle = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: var(--black-950, #0d0d0d);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const StyledTeaserBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -4px;
  z-index: 1;
  padding: 4px 8px;
  border-radius: 45px;
  background-color: var(--violet-500, #c0b6ff);
  color: #ffffff;
  font-weight: 600;
  font-size: 10px;
  white-space: nowrap;
`;

const StyledCheckmark = styled.div`
  position: absolute;
  top: -8px;
  right: -4px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #22c55e;
  color: #ffffff;
`;
