import styled from '@emotion/styled';
import { JSX } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Color } from '~/shared/theme/colors';
import { IconButton } from '~/shared/ui/IconButton';

import { navConfig } from './navConfig';

type NavProps = {
  className?: string;
};

export function Nav({ className }: NavProps): JSX.Element {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <StyledNavWrapper className={className}>
      <StyledNavMenu>
        {navConfig.map(({ iconSrc, text, to, disabled }) => {
          const isActive = pathname === to;

          const handleNavItemClick = () => {
            if (disabled || isActive) return;
            navigate(to);
          };

          return (
            <IconButton
              key={text}
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
  z-index: 1000;
`;

const StyledNavMenu = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  width: 100%;
`;
