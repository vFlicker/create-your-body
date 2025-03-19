import React, { useEffect, useState } from 'react'
import './Communication.css'
import axios from 'axios';
import { API_BASE_URL } from '../../API';

import ProfileBtn from '../../Components/ProfileBtn/ProfileBtn';

import chat from '../../Assets/nav/chat.svg'
import help from '../../Assets/svg/help.svg'
import bot from '../../Assets/svg/bot.svg'

const TelegramLinkButton = ({ username, icon, buttonText = 'Перейти в Telegram', disabled }) => {
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
      <button
        className='tgBtn'
        onClick={handleOpenTelegramLink}
        disabled={disabled}
      >
        <img src={icon} alt="Перейти в телеграмм" />
        <p>{buttonText}</p>
      </button>
    );
  };

export default function Communication({ data, base }) {
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.setBackgroundColor('#F2F2F2');
    }
  }, []);
  
  return (
    <div className='comPage'>
        <div className="topCom">
            <ProfileBtn level={data.user_level} user_photo={data.image} />
            <div className="comTitle">
                <img src={chat} alt="Общение и поддержка" />
                <h1>Общение и поддержка</h1>
            </div>
        </div>
        <div className="botCom">
            <p className="botComText">
            Присоединяйтесь к нашему сообществу и задавайте вопросы. Мы здесь, чтобы помочь вам 💜
            </p>
            { !base &&
            <TelegramLinkButton 
                username={''}  
                buttonText='Чат в Telegram'
                icon={chat}          
            />
            }
            <TelegramLinkButton 
                username={'zabota_CYB'}  
                buttonText='Поддержка'
                icon={help}          
            />
            <TelegramLinkButton 
                username={''}  
                buttonText='Общение с нейросетью'
                icon={bot}  
                disabled={true}        
            />
        </div>
    </div>
  )
}
