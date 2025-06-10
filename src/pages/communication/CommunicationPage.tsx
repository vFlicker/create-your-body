import styled from '@emotion/styled';
import { JSX } from 'react';

import { useUser } from '~/entities/user';
import { OpenTgLinkButton } from '~/features/OpenTgLinkButton';
import chatIconSrc from '~/shared/assets/nav/chat.svg';
import botIconSrc from '~/shared/assets/svg/bot.svg';
import channelIconSrc from '~/shared/assets/svg/channel.svg';
import helpIconSrc from '~/shared/assets/svg/help.svg';
import { CommonPageLayout } from '~/widgets/CommonPageLayout';

export function CommunicationPage(): JSX.Element {
  const { user, isUserPending } = useUser();

  const firstSteam = user.subscriptions.find((sub) => sub.stream === 1);
  const secondSteam = user.subscriptions.find((sub) => sub.stream === 2);

  const firstSteamIsPro = firstSteam && firstSteam.plan === 'Pro';
  const secondSteamIsPro = secondSteam && secondSteam.plan === 'Pro';
  const isPro = firstSteamIsPro || secondSteamIsPro;

  return (
    <CommonPageLayout
      title="Общение и поддержка"
      iconSrc={chatIconSrc}
      isLoading={isUserPending}
    >
      <StyledCommunicationPageWrapper>
        <StyledText>
          Присоединяйся к нашему сообществу и задавай вопросы. Мы здесь, чтобы
          помочь тебе 💜
        </StyledText>

        {isPro && (
          <>
            <OpenTgLinkButton
              username="+4IrED7hVDX9jMTAy"
              buttonText="Чат в Telegram"
              iconSrc={chatIconSrc}
            />
            <OpenTgLinkButton
              username="+g6mGqc6fOUNjNDdi"
              buttonText="Инфо канал"
              iconSrc={channelIconSrc}
            />
          </>
        )}

        <OpenTgLinkButton
          username="zabotaCYB"
          buttonText="Поддержка"
          iconSrc={helpIconSrc}
        />
        <OpenTgLinkButton
          buttonText="Общение с нейросетью"
          iconSrc={botIconSrc}
          disabled={true}
        />
      </StyledCommunicationPageWrapper>
    </CommonPageLayout>
  );
}

const StyledCommunicationPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledText = styled.p`
  color: #0d0d0d;
  font-size: 16px;
`;
