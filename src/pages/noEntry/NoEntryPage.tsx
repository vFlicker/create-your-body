import styled from '@emotion/styled';
import { JSX } from 'react';

import musculesIconSrc from '~/shared/assets/svg/muscles.svg';
import { Button } from '~/shared/ui/atoms/Button';

export function NoEntryPage(): JSX.Element {
  const handleOpenSite = () => {
    const tg = Telegram.WebApp;
    tg.ready();
    tg.openLink('https://createyourbody.ru/cyb');
  };

  return (
    <StyledNoEntryPageWrapper>
      <StyledTitle>Доступ в приложение закрыт</StyledTitle>
      <StyledText>
        Если считаешь, что это ошибка - обратись в поддержку
      </StyledText>
      <Button color="accent" iconSrc={musculesIconSrc} onClick={handleOpenSite}>
        Приобрести доступ
      </Button>
    </StyledNoEntryPageWrapper>
  );
}

const StyledNoEntryPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  height: 100vh;
  padding: 0 16px;

  text-align: center;
`;

const StyledTitle = styled.h1`
  font-size: 24px;
  color: #0d0d0d;
`;

const StyledText = styled.p`
  font-size: 14px;
  color: #0d0d0d;
`;
