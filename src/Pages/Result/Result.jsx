import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'; 
import './Result.css'
import axios from 'axios';
import { API_BASE_URL } from '../../API';

import Button from '../../Components/Button/Button'

import result from '../../Assets/img/result.jpg'
import settings from '../../Assets/svg/settings.svg'
import muscles from '../../Assets/svg/musclesBlack.svg'

export default function Result({ userId }) {
    const navigate = useNavigate();
    const [level, setLevel] = useState('pro')

useEffect(() => {
    const fetchLevel = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/v1/user`, {
                body: {user_id: userId}
            });
            setLevel(response.data.user_level)
        } catch (error) {
            console.log(`Ошибка ${error}`)
        }
    } 
    fetchLevel()
}, [userId])
    const description = {
        "pro": "У вас уверенный уровень подготовки,и вы готовы к интенсивным тренировкам. Наши программы помогут вам развить силу, выносливость и достичь новых спортивных целей!",
        "newbie": "Вы только начинаете свой путь в фитнесе. Мы подготовили для вас программы с упором на технику, постепенную адаптацию и безопасное повышение нагрузки."
    }
    return (
        <div className='resultPage'>
            <div className="resultImgContainer">
                <img src={result} alt="Результат опроса" />
            </div>
            <div className='resultInfo'>
                <div className="resultText">
                    <div className="levelContainer">
                        <h1>Ваш уровень: {level}</h1>
                        <p>{description[level]}</p>
                    </div>
                    <div className="clue">
                        <img src={settings} alt="Настройки" />
                        <p>Вы всегда можете изменить уровень в своем профиле</p>
                    </div>
                </div>
                <Button icon={muscles} text='К тренировкам' bg='#CBFF52' bgFocus='#EBFFBD' color='#0D0D0D' onClick={() => navigate('/dashboard')} />
            </div>
        </div>
    )
}
