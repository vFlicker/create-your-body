import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import defaultAvatarSrc from '~/shared/assets/nav/user.svg';
import { AppRoute } from '~/shared/router';

import Loader from '../../Components/Loader/Loader';

type ProfileProps = {
  level: 'Профи' | 'Новичок';
  photoSrc: string;
  isShowInfo?: boolean;
};

export function Profile({ level, photoSrc, isShowInfo = true }: ProfileProps) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (photoSrc) {
      const img = new Image();
      img.src = photoSrc;
      img.onload = () => setIsLoading(false);
      img.onerror = () => setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [photoSrc]);

  return (
    <StyledProfileWrapper>
      <StyledButton level={level} onClick={() => navigate(AppRoute.Profile)}>
        {isLoading && <Loader width={16} />}
        {!isLoading && (
          <StyledAvatar src={photoSrc ?? defaultAvatarSrc} alt="Ваш аватар" />
        )}
      </StyledButton>

      {isShowInfo && (
        <StyledInfoWrapper>
          Уровень: <span>{level}</span>
        </StyledInfoWrapper>
      )}
    </StyledProfileWrapper>
  );
}

const StyledProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`;

const StyledButton = styled.button<Pick<ProfileProps, 'level'>>`
  position: relative;

  width: 40px;
  height: 40px;

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
`;

const StyledInfoWrapper = styled.div`
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
