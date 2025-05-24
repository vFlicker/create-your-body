import styled from '@emotion/styled';
import { JSX } from 'react';

import { Color } from '~/shared/theme/colors';
import { NavButton } from '~/widget/nav/NavButton';

import { navConfig } from './navConfig';

export function Nav(): JSX.Element {
  return (
    <StyledNavWrapper>
      <StyledNavMenu>
        {navConfig.map((navItem) => (
          <NavButton {...navItem} />
        ))}
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
