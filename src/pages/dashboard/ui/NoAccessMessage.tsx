import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import lockIconSrc from '~/shared/assets/svg/lock-2.svg';
import { AppRoute } from '~/shared/router';
import { Button } from '~/shared/ui/atoms/Button';

export function NoAccessMessage(): JSX.Element {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(AppRoute.Subscriptions);
  };

  return (
    <StyledNoAccessMessageWrapper>
      <StyledImageWrapper>
        <img src={lockIconSrc} />
      </StyledImageWrapper>
      <StyledText>Доступ к курсу закрыт</StyledText>
      <Button color="accent" onClick={handleButtonClick}>
        Перейти к подпискам
      </Button>
    </StyledNoAccessMessageWrapper>
  );
}

const StyledNoAccessMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const StyledImageWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  border-radius: 6px;
  margin-bottom: 12px;
  padding: 12px;

  background-color: #f2f1ff;
`;

const StyledText = styled.p`
  margin-bottom: 20px;

  color: #797996;
  font-size: 14px;
  font-weight: 500;
`;
