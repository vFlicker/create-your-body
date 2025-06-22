import styled from '@emotion/styled';
import { JSX } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import defaultAvatarSrc from '~/shared/assets/nav/user.svg';
import { AppRoute } from '~/shared/router';

import { useUser } from '../api/useUser';

type UserMetaProps = {
  view: 'level' | 'name';
};

export function UserMeta({ view }: UserMetaProps): JSX.Element | null {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { user } = useUser();

  const handleClick = () => {
    if (pathname === AppRoute.StartProfile || pathname === AppRoute.Profile) {
      return;
    }

    navigate(AppRoute.StartProfile);
  };

  if (!user) {
    return null;
  }

  return (
    <StyledUserMetaWrapper>
      <StyledButton level={user.level} view={view} onClick={handleClick}>
        <StyledAvatar src={user.userpic ?? defaultAvatarSrc} alt="Ваш аватар" />
      </StyledButton>

      {view === 'level' && (
        <StyledLevelWrapper>
          Уровень: <span>{user.level}</span>
        </StyledLevelWrapper>
      )}

      {view === 'name' && (
        <StyledNameWrapper>
          <p>{user?.name || 'Имя'}</p>
          <span>{user?.level || 'Уровень'}</span>
        </StyledNameWrapper>
      )}
    </StyledUserMetaWrapper>
  );
}

const StyledUserMetaWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`;

const ButtonSize: Record<UserMetaProps['view'], string> = {
  level: '40px',
  name: '50px',
};

const StyledButton = styled.button<{
  view: UserMetaProps['view'];
  level: string;
}>`
  position: relative;

  width: ${({ view }) => ButtonSize[view]};
  height: ${({ view }) => ButtonSize[view]};

  border: 2px solid;
  border-color: ${({ level }) => (level === 'Профи' ? '#A799FF' : '#cbff52')};
  background: #f2f2f2;
  position: relative;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 12px;

  &::after {
    position: absolute;
    bottom: -1px;
    right: -1px;

    content: '';

    border: 1px solid #f2f2f2;
    width: 9px;
    height: 9px;
    border-radius: 50px;

    background-color: ${({ level }) =>
      level === 'Профи' ? '#A799FF' : '#cbff52'};
  }
`;

const StyledAvatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50px;
  object-fit: cover;
`;

const StyledLevelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  font-size: 12px;
  font-weight: 400;
  color: #999999;
  text-align: start;

  span {
    color: #0d0d0d;
    font-weight: 600;
  }
`;

const StyledNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  p {
    font-size: 18px;
    font-weight: 700;
    color: #0d0d0d;
  }

  span {
    font-size: 12px;
    color: #999999;
  }
`;
