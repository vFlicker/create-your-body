import './CommunicationPage.css';

import { useEffect } from 'react';

import chat from '~/shared/assets/nav/chat.svg';
import bot from '~/shared/assets/svg/bot.svg';
import channel from '~/shared/assets/svg/channel.svg';
import help from '~/shared/assets/svg/help.svg';

import ProfileBtn from '../../Components/ProfileBtn/ProfileBtn';

export const TelegramLinkButton = ({
  username,
  icon,
  buttonText = 'Перейти в Telegram',
  disabled,
  style,
}) => {
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
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.setBackgroundColor('#F2F2F2');
    }
  }, []);

  const firstSteam = data.subscriptions.find((sub) => sub.stream === 2);
  const secondSteam = data.subscriptions.find((sub) => sub.stream === 3);

  const firstSteamIsPro = firstSteam && firstSteam.plan === 'Pro';
  const secondSteamIsPro = secondSteam && secondSteam.plan === 'Pro';
  const isPro = firstSteamIsPro || secondSteamIsPro;

  return (
    <div className="comPage">
      <div className="topCom">
        <ProfileBtn level={data.user_level} user_photo={data.image} />
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
        {isPro && (
          <div className="hiteTgBtn">
            <TelegramLinkButton
              username="+dSvGTqfGPBo4MWY6"
              buttonText="Чат в Telegram"
              icon={chat}
            />
            <TelegramLinkButton
              username="+TEHjfwqW4GFiM2M6"
              buttonText="Инфо канал"
              icon={channel}
            />
          </div>
        )}
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
