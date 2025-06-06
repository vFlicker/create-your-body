import styled from '@emotion/styled';
import { JSX, PropsWithChildren } from 'react';

import { StreamsInfo, UserMeta } from '~/entities/user';

import { Color } from '../theme/colors';

type CommonPageProps = PropsWithChildren<{
  className?: string;
  title: string;
  hasStreamInfo?: boolean;
  iconSrc?: string;
  action?: JSX.Element;
}>;

export function CommonPage({
  className,
  title,
  hasStreamInfo = false,
  iconSrc,
  action,
  children,
}: CommonPageProps): JSX.Element {
  return (
    <StyledPageWrapper className={className}>
      <StyledHeader>
        <UserMeta />
        {hasStreamInfo && <StreamsInfo />}
      </StyledHeader>
      <StyledTopSectionWrapper>
        <StyledTitleWrapper>
          {iconSrc && <StyledIcon src={iconSrc} />}
          <StyledTitle>{title}</StyledTitle>
        </StyledTitleWrapper>
        {action}
      </StyledTopSectionWrapper>
      <StyledContentSectionWrapper>{children}</StyledContentSectionWrapper>
    </StyledPageWrapper>
  );
}

const StyledPageWrapper = styled.div``;

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledTopSectionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const StyledTitle = styled.h1`
  color: ${Color.Black_950};
  font-size: 24px;
  font-weight: bold;
`;

const StyledContentSectionWrapper = styled.div``;
