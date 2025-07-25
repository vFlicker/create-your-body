import styled from '@emotion/styled';
import { JSX } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  hasActiveSubscription,
  useSubscriptions,
} from '~/entities/subscription';
import { Color } from '~/shared/theme/colors';
import { IconButton } from '~/shared/ui/atoms/IconButton';

import { getNavConfig } from './navConfig';

type NavProps = {
  className?: string;
};

export function Nav({ className }: NavProps): JSX.Element | null {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { subscriptions, isSubscriptionsPending } = useSubscriptions();

  if (isSubscriptionsPending) return null;

  const hasAccess = hasActiveSubscription(subscriptions || []);

  return (
    <StyledNavWrapper className={className}>
      <StyledNavMenu>
        {getNavConfig(hasAccess).map(({ iconSrc, text, to, disabled }) => {
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

  background-color: ${Color.White};
  border: 1px solid ${Color.Black_100};
  z-index: 2;
`;

const StyledNavMenu = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 14px 20px 22px;
  width: 100%;
`;
