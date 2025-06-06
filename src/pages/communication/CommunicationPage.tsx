import './CommunicationPage.css';

import { CSSProperties, useEffect } from 'react';

import { Profile } from '~/entities/user';
import chat from '~/shared/assets/nav/chat.svg';
import bot from '~/shared/assets/svg/bot.svg';
import channel from '~/shared/assets/svg/channel.svg';
import help from '~/shared/assets/svg/help.svg';

type TelegramLinkButtonProps = {
  username: string;
  icon: string;
  buttonText?: string;
  disabled?: boolean;
  style?: CSSProperties;
};

export const TelegramLinkButton = ({
  username,
  icon,
  buttonText = 'Перейти в Telegram',
  disabled,
  style,
}: TelegramLinkButtonProps) => {
  const handleOpenTelegramLink = () => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      const link = `https://t.me/${username}`; // Формируем ссылку на Telegram-аккаунт
      tg.openTelegramLink(link);
    } else {
      console.error(
        'Telegram WebApp API недоступно. Убедитесь, что вы открыли приложение в Telegram.',
      );
    }
  };

  return (
    <button
      className="tgBtn"
      onClick={handleOpenTelegramLink}
      disabled={disabled}
      style={style}
    >
      <img src={icon} alt="Перейти в телеграмм" />
      <p>{buttonText}</p>
    </button>
  );
};

export function CommunicationPage({ data }) {
  return (
    <div className="comPage">
      <div className="topCom">
        <Profile level={data.user_level} photoSrc={data.image} />
        <div className="comTitle">
          <img src={chat} alt="Общение и поддержка" />
          <h1 style={{ fontSize: '24px' }}>Общение и поддержка</h1>
        </div>
      </div>
      <div className="botCom">
        <p className="botComText">
          Присоединяйся к нашему сообществу и задавай вопросы. Мы здесь, чтобы
          помочь тебе 💜
        </p>
        <div className="hiteTgBtn">
          <TelegramLinkButton
            username="+4IrED7hVDX9jMTAy"
            buttonText="Чат в Telegram"
            icon={chat}
          />
          <TelegramLinkButton
            username="+g6mGqc6fOUNjNDdi"
            buttonText="Инфо канал"
            icon={channel}
          />
        </div>
        <TelegramLinkButton
          username={'zabotaCYB'}
          buttonText="Поддержка"
          icon={help}
        />
        <TelegramLinkButton
          username={''}
          buttonText="Общение с нейросетью"
          icon={bot}
          disabled={true}
        />
      </div>
    </div>
  );
}
