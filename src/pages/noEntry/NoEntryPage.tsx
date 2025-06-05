import './NoEntryPage.css';
import '../food/FoodPage.css';

import { useState } from 'react';
import { createPortal } from 'react-dom';

import chatIconSrc from '~/shared/assets/nav/chat.svg';
import copyIconSrc from '~/shared/assets/svg/copy.svg';
import helpIconSrc from '~/shared/assets/svg/help.svg';
import musculesIconSrc from '~/shared/assets/svg/muscles.svg';
import { Button } from '~/shared/ui/Button';

import { TelegramLinkButton } from '../communication/CommunicationPage';

export function NoEntryPage({ logs, addLog }) {
  const [errorsContainer, setErrorsContainer] = useState(false);
  const tg = window.Telegram?.WebApp;

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
                color="secondary"
                iconSrc={copyIconSrc}
                onClick={() => {
                  navigator.clipboard.writeText(logs.join('\n'));
                }}
              >
                Скопировать все
              </Button>
              <TelegramLinkButton
                username={'zabotaCYB'}
                buttonText="Поддержка"
                icon={helpIconSrc}
                style={{ width: '100%' }}
              />
              <Button color="neutral" onClick={() => setErrorsContainer(false)}>
                Выйти
              </Button>
            </div>
          </div>,
          document.body,
        )}
      <h1>Доступ в приложение закрыт</h1>
      <p>Если считаешь, что это ошибка - обратись в поддержку</p>
      <Button color="accent" iconSrc={musculesIconSrc} onClick={handleOpenSite}>
        Приобрести доступ
      </Button>
      <Button color="secondary" iconSrc={chatIconSrc} onClick={openLogs}>
        Обратиться в поддержку
      </Button>
    </div>
  );
}
