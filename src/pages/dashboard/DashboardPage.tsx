import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from '~/entities/user';
import lockIconSrc from '~/shared/assets/svg/lock-2.svg';
import { AppRoute } from '~/shared/router';
import { Button } from '~/shared/ui/atoms/Button';
import { CommonPageLayout } from '~/widgets/CommonPageLayout';

export function DashboardPage(): JSX.Element {
  const { user, isUserPending } = useUser();

  if (!user || isUserPending)
    return (
      <CommonPageLayout
        title="Добро пожаловать!"
        hasStreamInfo={true}
        isLoading={isUserPending}
      />
    );

  return (
    <CommonPageLayout
      title={`Привет, ${user.name}!`}
      hasStreamInfo={true}
      hasBackButton={false}
    >
      <StyledContentWrapper>
        <NoAccessMessage />

        {/* TODO: we can show History component here */}
        {/* <p>Тут будут виджеты с информацией о тренировках, питании и т.д.</p> */}
      </StyledContentWrapper>
    </CommonPageLayout>
  );
}

function NoAccessMessage(): JSX.Element {
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

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
`;

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
