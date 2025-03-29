import React, { useState, useEffect } from 'react'
import './TrainBox.css'

import play from '../../Assets/svg/play.svg'
import mokap from '../../Assets/img/mokap.PNG'
import close from '../../Assets/svg/closeTrain.svg'

export default function TrainBox({ data, lectures, onClick, level }) {
    const [levelType, setLevelType] = useState(level);

    useEffect(() => {
        setLevelType(level === 'Новичок' ? 'newbie' : 'profi');
    }, [level]);

    // Определяем, какие данные использовать
    const isLecture = !!lectures;
    const currentData = isLecture ? lectures : data;
    const isClosed = currentData?.closed;

    console.log('Current data:', currentData);

    // Получаем количество тренировок/упражнений
    const getCount = () => {
        if (currentData?.week) {
            return currentData.trainings.length;
        }
        if (currentData?.title) {
            if (currentData.title.toLowerCase().includes('лекция')) {
                return 0;
            }
            // Определяем, какие данные использовать в зависимости от типа и уровня
            const trainingData = isLecture ? currentData.profi : currentData[levelType];

            // Проверяем, является ли trainingData массивом или объектом
            if (Array.isArray(trainingData)) {
                return trainingData.length;
            } else if (trainingData && typeof trainingData === 'object') {
                return 1; // Если это объект, значит это одна тренировка
            }
            return 0;
        }
        return 0;
    };

    const getTitle = () => {
        if (currentData?.week) {
            return `Неделя ${currentData.week}`;
        }
        if (currentData?.title) {
            return currentData.title;
        }
        return '';
    };

    const getSubtitle = () => {
        if (currentData?.week) {
            const hasLectures = currentData.trainings?.some(training =>
                training.title.toLowerCase().includes('лекция')
            );
            return hasLectures ? `Лекций ${getCount()}` : `Тренировок ${getCount()}`;
        }
        if (currentData?.title) {
            if (currentData.title.toLowerCase().includes('лекция')) {
                return '';
            }
            return `Упражнений ${getCount()}`;
        }
        return '';
    };

    return (
        <div className={`trainBox ${isClosed ? 'closed' : ''}`} onClick={isClosed ? undefined : onClick}>
            {isClosed && <img src={close} alt="close" className='closeTrain'/>}
            <div className='forTrainImg'>
                <img src={mokap} alt="play" />
            </div>
            <div className='forTrainText'>
                <div className='trainText'>
                    <h1>{getTitle()}</h1>
                    <p>{getSubtitle()}</p>
                </div>
                <button className='trainBtn'>
                    <img src={play} alt="arrow" />
                </button>
            </div>
        </div>
    )
}
