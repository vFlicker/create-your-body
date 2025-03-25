import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './Train.css'

import ProfileBtn from '../../Components/ProfileBtn/ProfileBtn';
import Container from '../../Components/Container/Container';

import muscules from '../../Assets/svg/musclesBlack.svg'

export default function Train({ data }) {
    const [currentView, setCurrentView] = useState('main');
    const [slideDirection, setSlideDirection] = useState('');
    const location = useLocation();

    const pageContainersData = [
        {
          name: 'Разминка / МФР',
          icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.5 10C14.6716 10 14 9.32843 14 8.5M8.5 10C9.32843 10 10 9.32843 10 8.5" stroke="#0D0D0D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14 2V2.64298C14 3.22979 14 3.52319 14.0654 3.77255C14.223 4.37391 14.6513 4.86778 15.2244 5.10888C15.462 5.20885 15.7524 5.25035 16.3333 5.33333C17.4952 5.49931 18.0761 5.5823 18.5513 5.78224C19.6973 6.26445 20.554 7.25217 20.8693 8.4549C21 8.95361 21 9.54043 21 10.714V22" stroke="#0D0D0D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10 2V2.64298C10 3.22979 10 3.52319 9.93463 3.77255C9.77699 4.37391 9.34867 4.86778 8.77564 5.10888C8.53804 5.20885 8.24758 5.25035 7.66667 5.33333C6.50484 5.49931 5.92393 5.5823 5.44871 5.78224C4.30266 6.26445 3.44601 7.25217 3.13073 8.4549C3 8.95361 3 9.54043 3 10.714V22" stroke="#0D0D0D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 13V22" stroke="#0D0D0D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M18 11.5C18 11.5 17.4549 14.3636 17.503 17.2273C17.535 19.1271 18 22 18 22" stroke="#0D0D0D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6 11.5C6 11.5 6.54513 14.3636 6.49699 17.2273C6.46505 19.1271 6 22 6 22" stroke="#0D0D0D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>,
          closed: null,
          buy: false,
          instruction: false,
        //   to: 'begin'
        },
        {
          name: 'Все о тренировках',
          icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#0D0D0D" stroke-width="1.5"/>
          <path d="M10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 9.39815 13.8837 9.76913 13.6831 10.0808C13.0854 11.0097 12 11.8954 12 13V13.5" stroke="#0D0D0D" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M11.992 17H12.001" stroke="#0D0D0D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          ,
          closed: null,
          buy: false,
          instruction: false,
        //   to: 'train'
        },
        {
          name: 'Тренировка для дома',
          icon: muscules,
          closed: null,
          buy: false,
          instruction: false,
        //   to: 'food'
        },
        {
          name: 'Тренировка для зала',
          icon: muscules,
          closed: null,
          buy: false,
          instruction: false,
        //   to: 'lectures'
        },
    ];

    // Обработка изменений в навигации
    useEffect(() => {
        const handlePopState = () => {
            if (currentView !== 'main') {
                handleBack();
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [currentView]);

    const handleContainerClick = (containerData) => {
        if (containerData.to === 'train') {
            setSlideDirection('slide-left');
            setCurrentView('train-details');
            // Добавляем запись в историю браузера
            window.history.pushState({ view: 'train-details' }, '', location.pathname);
        }
    };

    const handleBack = () => {
        setSlideDirection('slide-right');
        setTimeout(() => {
            setCurrentView('main');
            setSlideDirection('');
        }, 300);
    };

    const renderContent = () => {
        switch (currentView) {
            case 'main':
                return (
                    <div className={`train-content ${slideDirection}`}>
                        {pageContainersData.map((containerData, index) => (
                            <Container 
                                key={index} 
                                data={containerData} 
                                onClick={() => handleContainerClick(containerData)}
                            />
                        ))}
                    </div>
                );
            case 'train-details':
                return (
                    <div className={`train-content ${slideDirection}`}>
                        <div className="train-details-content">
                            {/* Здесь будет контент деталей тренировки */}
                            <h2>Детали тренировки</h2>
                            <button onClick={handleBack}>Назад</button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className='trainPage'>
            <div className="topTrain">
                <ProfileBtn level={data.user_level} user_photo={data.image} />
                <div className="trainTitle">
                    <img src={muscules} alt="Тренировка" />
                    <h1>Тренировки</h1>
                </div>
            </div>
            <div className="botTrain">
                {renderContent()}
            </div>
        </div>
    );
}
