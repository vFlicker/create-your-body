import styled from '@emotion/styled';
import { JSX, PropsWithChildren } from 'react';

import { CloseAppButton } from '~/features/CloseAppButton';
import { Color } from '~/shared/theme/colors';
import { Loader } from '~/shared/ui/atoms/Loader';
import { Nav } from '~/shared/ui/molecules/nav';

type EmptyPageLayoutProps = PropsWithChildren<{
  isLoading?: boolean;
  action?: JSX.Element;
}>;

export function EmptyPageLayout({
  isLoading,
  children,
}: EmptyPageLayoutProps): JSX.Element {
  return (
    <StyledPageWrapper>
      <StyledButtonsWrapper>
        <CloseAppButton />
      </StyledButtonsWrapper>

      <StyledMainWrapper>
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
  padding: 16px 16px 48px;

  display: flex;
  justify-content: end;
  width: 100%;
`;

const StyledMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex-grow: 1;

  padding: 16px 16px 24px;
  border-radius: 20px 20px 0 0;

  background-color: ${Color.White};
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border-radius: 16px 16px 0 0;
`;
