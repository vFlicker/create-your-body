import styled from '@emotion/styled';
import { JSX, PropsWithChildren } from 'react';

import BookmarkIcon from '~/shared/assets/svg/bookmark.svg?react';

type FactBlockProps = PropsWithChildren<{
  className?: string;
}>;

export function FactBlock({
  className,
  children,
}: FactBlockProps): JSX.Element {
  return (
    <StyledFactBlockWrapper className={className}>
      <StyledBookmarkIcon fill="#A799FF" stroke="#A799FF" />
      <StyledTitle>💡 Интересный факт</StyledTitle>
      <StyledText>{children}</StyledText>
    </StyledFactBlockWrapper>
  );
}

const StyledFactBlockWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 6px;

  width: 100%;
  padding: 14px 12px;
  border-radius: 10px;

  background-color: #f2f1f7;
`;

const StyledBookmarkIcon = styled(BookmarkIcon)`
  position: absolute;

  top: 0;
  right: 16px;
`;

const StyledTitle = styled.div`
  color: #403c77;
  font-size: 13px;
  font-weight: 700;
  line-height: 130%;
`;

const StyledText = styled.div`
  color: #403c77;
  font-size: 12px;
  font-weight: 500;
  line-height: 140%;

  span {
    color: #403c77;
    font-weight: 700;
  }
`;
