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

  if (!user || isUserPending)
    return (
      <CommonPageLayout
        title="Общение и поддержка"
        iconSrc={chatIconSrc}
        isLoading={isUserPending}
      />
    );

  const secondSteam = user.subscriptions.find((sub) => sub.stream === 2);
  const thirdSteam = user.subscriptions.find((sub) => sub.stream === 3);

  const firstSteamIsPro = secondSteam && secondSteam.plan === 'Pro';
  const secondSteamIsPro = thirdSteam && thirdSteam.plan === 'Pro';
  const isPro = firstSteamIsPro || secondSteamIsPro;

  return (
    <CommonPageLayout title="Общение и поддержка" iconSrc={chatIconSrc}>
      <StyledCommunicationPageWrapper>
        <StyledText>
          Присоединяйся к нашему сообществу и задавай вопросы. Мы здесь, чтобы
          помочь тебе 💜
        </StyledText>

        {isPro && (
          <>
            <OpenTgLinkButton
              username="+dSvGTqfGPBo4MWY6"
              buttonText="Чат в Telegram"
              iconSrc={chatIconSrc}
            />
            <OpenTgLinkButton
              username="+TEHjfwqW4GFiM2M6"
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
