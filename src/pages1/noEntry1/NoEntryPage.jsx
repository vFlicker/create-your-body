import './NoEntryPage.css';
import '../food1/FoodPage.css';

import { useState } from 'react';
import { createPortal } from 'react-dom';

import chat from '~/shared/assets/nav/chat.svg';
import copy from '~/shared/assets/svg/copy.svg';
import help from '~/shared/assets/svg/help.svg';
import muscules from '~/shared/assets/svg/muscles.svg';

import Button from '../../Components/Button/Button';
import { TelegramLinkButton } from '../communication1/CommunicationPage';

export function NoEntryPage({ logs, addLog }) {
  const [errorsContainer, setErrorsContainer] = useState(false);
  const tg = window.Telegram?.WebApp;
  const username = 'zabotaCYB';
  const link = `https://t.me/${username}`;

  const handleOpenTelegramLink = () => {
    if (tg) {
      tg.ready();
      tg.openTelegramLink(link);
    } else {
      window.location.href = `https://t.me/${username}`;
    }
  };

  const openLogs = () => {
    setErrorsContainer(!errorsContainer);
    addLog('Открытие контейнера ошибок:', !errorsContainer);
  };

  const handleOpenSite = () => {
    if (tg) {
      tg.ready();
      tg.openLink('https://createyourbody.ru/cyb'); // Открывает ссылку через Telegram
    } else {
      window.location.href = 'https://createyourbody.ru/cyb'; // Резервный вариант
    }
  };

  return (
    <div className="noEntryPage">
      {errorsContainer &&
        createPortal(
          <div className="errorsContainer">
            <p>
              Здравствуйте!
              <br />
              <br />
              Это окно предназначено для просмотра логов приложения.
              <br />
              <br />
              Пожалуйста, скопируйте текст логов нажав на кнопку
              &quot;Скопировать все&quot; и отправьте его нам в чат поддержки.
              <br />
              <br />
              Спасибо!
            </p>
            <div className="logsContainer">
              {logs.map((log, index) => (
                <div key={index} className="logItem">
                  <pre>{log}</pre>
                </div>
              ))}
            </div>
            <div className="supportBtn">
              <Button
                bg={'#CBFF52'}
                bgFocus={'#EBFFBD'}
                color={'#0d0d0d'}
                icon={copy}
                text={'Скопировать все'}
                onClick={() => {
                  navigator.clipboard.writeText(logs.join('\n'));
                }}
                width={'100%'}
              />
              <TelegramLinkButton
                username={'zabotaCYB'}
                buttonText="Поддержка"
                onClick={handleOpenTelegramLink}
                icon={help}
                style={{ width: '100%' }}
              />
              <Button
                bg={'#0D0D0D'}
                bgFocus={'#A799FF'}
                color={'#fff'}
                text={'Выйти'}
                onClick={() => {
                  setErrorsContainer(false);
                  addLog('Закрытие контейнера ошибок');
                }}
                width={'100%'}
              />
            </div>
          </div>,
          document.body,
        )}
      <h1>Доступ в приложение закрыт</h1>
      <p>Если считаешь, что это ошибка - обратись в поддержку</p>
      <Button
        bg="#A799FF"
        bgFocus="#776CBC"
        icon={muscules}
        onClick={handleOpenSite}
        text="Приобрести доступ"
        color="#FFFFFF"
        width="100%"
      />
      <Button
        bg="#CBFF52"
        bgFocus="#EBFFBD"
        icon={chat}
        onClick={openLogs}
        text="Обратиться в поддержку"
        color="#0d0d0d"
        width="100%"
      />
    </div>
  );
}
