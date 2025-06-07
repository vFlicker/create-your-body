import styled from '@emotion/styled';
import { JSX, PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';

import { StreamsInfo, UserMeta } from '~/entities/user';
import { BackButton } from '~/features/BackButton';
import { CloseButton } from '~/features/CloseButton';
import { AppRoute } from '~/shared/router';
import { Color } from '~/shared/theme/colors';
import { Loader } from '~/shared/ui/Loader';
import { Nav } from '~/shared/ui/nav';

// TODO: add props hasBackButton
const HIDE_BACK_BUTTON_PATHS = [AppRoute.Dashboard];

type CommonPageLayoutProps = PropsWithChildren<{
  title: string;
  isLoading: boolean;
  hasStreamInfo?: boolean;
  iconSrc?: string;
  action?: JSX.Element;
}>;

export function CommonPageLayout({
  title,
  isLoading,
  hasStreamInfo = false,
  iconSrc,
  action,
  children,
}: CommonPageLayoutProps): JSX.Element {
  const location = useLocation();

  const pathname = location.pathname as AppRoute;
  const isBackButtonVisible = !HIDE_BACK_BUTTON_PATHS.includes(pathname);

  return (
    <StyledPageWrapper>
      <StyledButtonsWrapper>
        {isBackButtonVisible && <BackButton />}
        <CloseButton />
      </StyledButtonsWrapper>

      <StyledMainWrapper>
        <StyledHeader>
          <StyledUserMetaWrapper>
            <UserMeta />
            {hasStreamInfo && <StreamsInfo />}
          </StyledUserMetaWrapper>
          <StyledTitleSectionWrapper>
            <StyledTitleWrapper>
              {iconSrc && <StyledIcon src={iconSrc} />}
              <StyledTitle>{title}</StyledTitle>
            </StyledTitleWrapper>
            {action}
          </StyledTitleSectionWrapper>
        </StyledHeader>
        <StyledContentWrapper>
          {isLoading && <Loader />}
          {!isLoading && children}
        </StyledContentWrapper>
      </StyledMainWrapper>

      <Nav />
    </StyledPageWrapper>
  );
}

const StyledPageWrapper = styled.div`
  position: relative;

  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 90px);
`;

const StyledButtonsWrapper = styled.div`
  position: absolute;
  padding: 16px;

  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 70px 16px 32px 16px;
`;

const StyledUserMetaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledTitleSectionWrapper = styled.div`
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

const StyledContentWrapper = styled.div`
  flex-grow: 1;
  padding: 16px 16px 24px;
  border-radius: 16px 16px 0 0;
  background-color: ${Color.White};
`;
