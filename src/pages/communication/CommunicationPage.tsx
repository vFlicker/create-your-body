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

  const steam4 = user.subscriptions.find((sub) => sub.stream === 4);
  const steam2025 = user.subscriptions.find((sub) => sub.stream === 2025);

  const isThirdSteamPro = steam4 && steam4.plan === 'Pro';
  const isFourthSteamPro = steam2025 && steam2025.plan === 'Pro';
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
              username="+Bsc0EGGK5JMxYmMy"
              buttonText="Чат в Telegram"
              iconSrc={chatIconSrc}
            />
            <OpenTgLinkButton
              username="+CvD6vn0jlYs0ZTFi"
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
