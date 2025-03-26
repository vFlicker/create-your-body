import React, { useState } from 'react'
import './Train.css'

import ProfileBtn from '../../Components/ProfileBtn/ProfileBtn';
import TrainContainer from '../../Components/TrainContainer/TrainContainer';
import VideoPage from '../../Components/VideoPage/VideoPage';
import Selecter from '../../Components/Selecter/Selecter';

import muscules from '../../Assets/svg/musclesBlack.svg'
import back from '../../Assets/train/back.svg'
import question from '../../Assets/train/question.svg'
import sport from '../../Assets/train/sport.svg'
import dumbbells from '../../Assets/train/dumbbells.svg'

export default function Train({ data }) {
    const [currentView, setCurrentView] = useState('main');
    const [translateX, setTranslateX] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const pageContainersData = [
        {
          name: 'Разминка / МФР',
          icon: back,
          to: 'warmup'
        },
        {
          name: 'Все о тренировках',
          icon: question,
          to: 'train'
        },
        {
          name: 'Тренировка для дома',
          icon: sport,
          to: 'home'
        },
        {
          name: 'Тренировка для зала',
          icon: dumbbells,
          to: 'gym'
        },
    ];

    const handleContainerClick = (containerData) => {
        if (containerData.to) {
            setTranslateX(prev => prev - 100);
            setTimeout(() => {
            setCurrentView(containerData.to);
            }, 150);
        }
    };

    const handleBack = () => {
        setTranslateX(prev => prev + 100);
        setTimeout(() => {
            setCurrentView('main');
        }, 150);
    };

    const renderContent = () => {
        switch (currentView) {
            case 'main':
                return (
                    <div className="train-content" style={{ transform: `translateX(${translateX}%)` }}>
                        {pageContainersData.map((containerData, index) => (
                            <TrainContainer 
                                key={index} 
                                data={containerData} 
                                onClick={handleContainerClick}
                            />
                        ))}
                    </div>
                );
            case 'warmup':
                return (
                    <div className="train-details-content" style={{ transform: `translateX(${translateX - 50}%)` }}>
                        <Selecter textOne='Разминка' textTwo='МФР' activeIndex={activeIndex} onClick={setActiveIndex} />
                        <VideoPage activeIndex={activeIndex} text={''} />
                    </div>
                );
            case 'train':
                return (
                    <div className="train-details-content" style={{ transform: `translateX(${translateX}%)` }}>
                        <h2>Все о тренировках</h2>
                        <button onClick={handleBack}>Назад</button>
                    </div>
                );
            case 'home':
                return (
                    <div className="train-details-content" style={{ transform: `translateX(${translateX}%)` }}>
                        <h2>Тренировка для дома</h2>
                        <button onClick={handleBack}>Назад</button>
                    </div>
                );
            case 'gym':
                return (
                    <div className="train-details-content" style={{ transform: `translateX(${translateX}%)` }}>
                        <h2>Тренировка для зала</h2>
                        <button onClick={handleBack}>Назад</button>
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
