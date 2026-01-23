import styled from '@emotion/styled';
import { JSX } from 'react';

import { Color } from '../../theme/colors';

type TrainingCoverCardProps = {
  title: string;
  coverImage?: string | null;
  disabled?: boolean;
  badgeText?: string;
  onClick: () => void;
};

export function TrainingCoverCard({
  title,
  coverImage,
  disabled = false,
  badgeText,
  onClick,
}: TrainingCoverCardProps): JSX.Element {
  const handleClick = () => {
    if (!disabled) onClick();
  };

  return (
    <StyledWrapper>
      {badgeText && <StyledBadge>{badgeText}</StyledBadge>}
      <StyledCard $disabled={disabled} onClick={handleClick}>
        <StyledContent $disabled={disabled}>
          <StyledTitle>{title}</StyledTitle>

          <StyledImageWrapper>
            {coverImage && <StyledCoverImage src={coverImage} alt={title} />}
          </StyledImageWrapper>
        </StyledContent>
      </StyledCard>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: relative;
`;

const StyledCard = styled.div<{ $disabled: boolean }>`
  display: flex;
  height: 80px;
  border: 1px solid ${Color.Black_100};
  border-radius: 14px;
  background-color: #fafafa;
  overflow: hidden;
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
`;

const StyledContent = styled.div<{ $disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

const StyledTitle = styled.h2`
  flex: 1;
  padding: 16px;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.2;
  color: ${Color.Black_950};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const StyledImageWrapper = styled.div`
  flex-shrink: 0;
  height: 80px;
  border-radius: 0 14px 14px 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledCoverImage = styled.img`
  height: 80px;
  width: auto;
  object-fit: contain;
`;

const StyledBadge = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 6px 8px;
  border-radius: 45px;

  color: #ffffff;
  font-weight: 600;
  font-size: 10px;
  white-space: nowrap;

  background-color: ${Color.Violet_200};
`;
