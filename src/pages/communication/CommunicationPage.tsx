import styled from '@emotion/styled';
import { JSX } from 'react';

import { useUser } from '~/entities/user';
import { OpenTgLinkButton } from '~/features/OpenTgLinkButton';
import botIconSrc from '~/shared/assets/svg/bot.svg';
import channelIconSrc from '~/shared/assets/svg/channel.svg';
import chatIconSrc from '~/shared/assets/svg/chat.svg';
import helpIconSrc from '~/shared/assets/svg/help.svg';
import { CommonPageLayout } from '~/widgets/layouts/CommonPageLayout';

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

  const thirdSteam = user.subscriptions.find((sub) => sub.stream === 3);
  const fourthSteam = user.subscriptions.find((sub) => sub.stream === 4);

  const isThirdSteamPro = thirdSteam && thirdSteam.plan === 'Pro';
  const isFourthSteamPro = fourthSteam && fourthSteam.plan === 'Pro';
  const isPro = isThirdSteamPro || isFourthSteamPro;

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
              username="+W7DOsFM7QBhjMjgy"
              buttonText="Чат в Telegram"
              iconSrc={chatIconSrc}
            />
            <OpenTgLinkButton
              username="+qjt6LLKQBso3ODFi"
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
