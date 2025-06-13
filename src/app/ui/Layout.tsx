import styled from '@emotion/styled';
import { JSX } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { BackButton } from '~/features/BackButton';
import { CloseButton } from '~/features/CloseButton';
import { AppRoute } from '~/shared/router';
import { Nav } from '~/shared/ui/nav';

export function Layout(): JSX.Element {
  const { pathname } = useLocation();

  // TODO: check the routing rules
  const hiddenPathsBack = [
    AppRoute.Start,
    AppRoute.Quiz,
    AppRoute.QuizResult,
    AppRoute.Dashboard,
  ];

  // TODO: check the routing rules
  const hiddenPathsNav = [
    AppRoute.Start,
    AppRoute.Quiz,
    AppRoute.QuizResult,
    AppRoute.NoEntry,
  ];

  const showControlsBack = !hiddenPathsBack.includes(pathname as AppRoute);
  const showControlsNav = !hiddenPathsNav.includes(pathname as AppRoute);

  return (
    <>
      <StyledHeader>
        {showControlsBack && <BackButton />}
        <CloseButton />
      </StyledHeader>
      <StyledMain>
        <StyledPageContainer>
          <StyledPage>
            <Outlet />
          </StyledPage>
        </StyledPageContainer>
        {showControlsNav && <Nav />}
      </StyledMain>
    </>
  );
}

const StyledPageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  flex: 1;
  overflow-x: hidden;
`;

const StyledPage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  will-change: transform, opacity;
  display: flex;
`;

const StyledHeader = styled.div`
  position: absolute;
  top: 16px;
  height: 28px;
  width: 100%;
`;

const StyledMain = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;
