import React from 'react'
import './NoEntry.css'

import Button from '../../Components/Button/Button';

import chat from '../../Assets/nav/chat.svg'

export default function NoEntry() {
    const username = 'zabota_CYB' // Поддержка
    const handleOpenTelegramLink = () => {
        const tg = window.Telegram?.WebApp;
        if (tg) {
          tg.ready();
          const link = `https://t.me/${username}`; // Формируем ссылку на Telegram-аккаунт
          tg.openTelegramLink(link);
  
        } else {
          console.error('Telegram WebApp API недоступно. Убедитесь, что вы открыли приложение в Telegram.');
        }
      };
  return (
    <div className='noEntryPage'>
        <h1>Доступ в приложение закрыт</h1>
        <p>Если вы считаете что это ошибка, обратитесь в поддержку</p>
        <Button bg='#CBFF52' bgFocus='#EBFFBD' icon={chat} onClick={handleOpenTelegramLink} text='Обратиться в поддержку' color='#0d0d0d' width='100%' />
    </div>
  )
}
