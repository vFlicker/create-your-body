import React from 'react'
import './NoEntry.css'

import Button from '../../Components/Button/Button';

import chat from '../../Assets/nav/chat.svg'
import muscules from '../../Assets/svg/muscles.svg'


export default function NoEntry() {
    const tg = window.Telegram?.WebApp;
    const username = 'zabotaCYB' // Поддержка
    const link = `https://t.me/${username}`; // Формируем ссылку на Telegram-аккаунт

    const handleOpenTelegramLink = () => {
        if (tg) {
          tg.ready();
          tg.openTelegramLink(link);
  
        } else {
          window.location.href = `https://t.me/${username}`;
        }
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
    <div className='noEntryPage'>
        <h1>Доступ в приложение закрыт</h1>
        <p>Если считаешь, что это ошибка - обратись в поддержку</p>
        <Button bg='#A799FF' bgFocus='#776CBC' icon={muscules} onClick={handleOpenSite} text='Приобрести доступ' color='#FFFFFF' width='100%' />
        <Button bg='#CBFF52' bgFocus='#EBFFBD' icon={chat} onClick={handleOpenTelegramLink} text='Обратиться в поддержку' color='#0d0d0d' width='100%' />
    </div>
  )
}
