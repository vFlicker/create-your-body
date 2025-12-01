import styled from '@emotion/styled';
import { JSX } from 'react';

import { useUser } from '~/entities/user';
import { OpenTgLinkButton } from '~/features/OpenTgLinkButton';
import botIconSrc from '~/shared/assets/svg/bot.svg';
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

  return (
    <CommonPageLayout title="Общение и поддержка" iconSrc={chatIconSrc}>
      <StyledCommunicationPageWrapper>
        <StyledText>
          Присоединяйся к нашему сообществу и задавай вопросы. Мы здесь, чтобы
          помочь тебе 💜
        </StyledText>

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
