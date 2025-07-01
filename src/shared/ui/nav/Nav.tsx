import styled from '@emotion/styled';
import { JSX } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useUser } from '~/entities/user';
import { Color } from '~/shared/theme/colors';
import { IconButton } from '~/shared/ui/IconButton';

import { getNavConfig } from './navConfig';

type NavProps = {
  className?: string;
};

export function Nav({ className }: NavProps): JSX.Element | null {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { user, isUserPending } = useUser();

  if (!user || isUserPending) {
    return null;
  }

  const secondSteam = user.subscriptions.find((sub) => sub.stream === 2);
  const navConfig = getNavConfig(!!secondSteam);

  return (
    <StyledNavWrapper className={className}>
      <StyledNavMenu>
        {navConfig.map(({ iconSrc, text, to, disabled }) => {
          const isActive = pathname === to || pathname.startsWith(`${to}/`);

          const handleNavItemClick = () => {
            if (disabled || isActive) return;
            if (to) navigate(to);
          };

          return (
            <IconButton
              key={text}
              color="secondary"
              iconSrc={iconSrc}
              text={text}
              disabled={disabled}
              isActive={isActive}
              onClick={handleNavItemClick}
            />
          );
        })}
      </StyledNavMenu>
    </StyledNavWrapper>
  );
}

const StyledNavWrapper = styled.div`
  position: sticky;
  bottom: 0;

  display: flex;
  justify-content: center;
  width: 100%;
  height: 90px;

  background-color: ${Color.Black_50};
  z-index: 2;
`;

const StyledNavMenu = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  width: 100%;
`;
