import styled from '@emotion/styled';
import { JSX } from 'react';
import { Link } from 'react-router-dom';

import { ChangeUserLevel } from '~/features/ChangeUserLevel';
import userIconSrc from '~/shared/assets/profile/user.svg';
import walletIconSrc from '~/shared/assets/profile/wallet.svg';
import ChevronRightIcon from '~/shared/assets/svg/chevron-right.svg?react';
import { AppRoute } from '~/shared/router';
import { UserPageLayout } from '~/widgets/layouts/UserPageLayout';

const links = [
  {
    to: AppRoute.ProfileEdit,
    iconSrc: userIconSrc,
    label: 'Личные данные',
  },
  {
    to: AppRoute.Subscriptions,
    iconSrc: walletIconSrc,
    label: 'Мои подписки',
  },
];

export function ProfilePage(): JSX.Element {
  return (
    <UserPageLayout isLoading={false}>
      <StyledContentWrapper>
        <ChangeUserLevel />

        <StyledLinkList>
          {links.map(({ iconSrc, label, to }) => (
            <StyledLink key={to} to={to}>
              <StyledLinkIcon src={iconSrc} />
              {label}
              <StyledChevronRightIcon stroke="#8888bc" />
            </StyledLink>
          ))}
        </StyledLinkList>
      </StyledContentWrapper>
    </UserPageLayout>
  );
}

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledLinkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 12px 18px;
  border-radius: 10px;

  background-color: #f7f6fb;
`;

const StyledLink = styled(Link)`
  position: relative;

  display: flex;
  align-items: center;
  padding: 10px 0;

  &:not(:last-child)::after {
    content: '';

    position: absolute;
    left: 0;
    bottom: -10px;

    width: 100%;
    height: 1px;

    background-color: #ebe9f4;
  }
`;

const StyledLinkIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 10px;
`;

const StyledChevronRightIcon = styled(ChevronRightIcon)`
  width: 14px;
  height: 14px;
  margin-left: auto;
`;
