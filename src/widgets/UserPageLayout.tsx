import styled from '@emotion/styled';
import { JSX, PropsWithChildren } from 'react';

import { UserMeta } from '~/entities/user';
import { BackButton } from '~/features/BackButton';
import { ChangeUserLevel } from '~/features/ChangeUserLevel';
import { CloseButton } from '~/features/CloseButton';
import { Color } from '~/shared/theme/colors';
import { Loader } from '~/shared/ui/Loader';
import { Nav } from '~/shared/ui/nav';

type UserPageLayoutProps = PropsWithChildren<{
  isLoading: boolean;
  hasUserLevel: boolean;
}>;

export function UserPageLayout({
  isLoading,
  hasUserLevel,
  children,
}: UserPageLayoutProps): JSX.Element {
  return (
    <StyledPageWrapper>
      <StyledButtonsWrapper>
        <BackButton />
        <CloseButton />
      </StyledButtonsWrapper>

      <StyledMainWrapper>
        <StyledHeader>
          <StyledUserMetaWrapper>
            <UserMeta view="name" />
            {hasUserLevel && <ChangeUserLevel />}
          </StyledUserMetaWrapper>
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
  padding: 16px 16px 48px;

  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  border-radius: 20px 20px 0 0;

  background-color: ${Color.White};
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

const StyledUserMetaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledContentWrapper = styled.div`
  flex-grow: 1;
  padding: 16px 16px 24px;
  border-radius: 16px 16px 0 0;
`;
