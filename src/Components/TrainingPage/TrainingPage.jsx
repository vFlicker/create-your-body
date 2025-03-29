import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TrainingPage.css';
import Button from '../Button/Button';
import Loader from '../../Components/Loader/Loader';

import arrow from '../../Assets/svg/arrow.svg'
import check from '../../Assets/svg/check.svg'
import brain from '../../Assets/svg/brain.svg'
const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0
    }),
    center: {
        x: 0,
        opacity: 1
    },
    exit: (direction) => ({
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0
    })
};

const transition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3
};

export default function TrainingPage({ trainingData, level, onBack, lectures }) {
    const [levelType, setLevelType] = useState('newbie');
    const [currentPartIndex, setCurrentPartIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [loadingStates, setLoadingStates] = useState({
        video1: true,
        video2: true,
        video3: true
    });

    useEffect(() => {
        setLevelType(level === 'Новичок' ? 'newbie' : 'profi');
    }, [level]);

    const handleVideoLoad = (videoKey) => {
        setLoadingStates(prev => ({
            ...prev,
            [videoKey]: false
        }));
    };

    if (!trainingData || !trainingData[levelType]) {
        return null;
    }

    const currentData = trainingData[levelType];
    const parts = Array.isArray(currentData) ? currentData : [currentData];

    // Фильтруем пустые части
    const validParts = parts.filter(part =>
        part.videoUrl || part.text || part.videoUrl_2 || part.text_2 ||
        part.videoUrl_3 || part.text_3 || part.super_text
    );

    const currentPart = validParts[currentPartIndex];
    const isLastPart = currentPartIndex === validParts.length - 1;

    const handleNext = () => {
        if (isLastPart) {
            onBack();
        } else {
            setDirection(1);
            setCurrentPartIndex(prev => prev + 1);
            // Сбрасываем состояния загрузки при переходе к следующей части
            setLoadingStates({
                video1: true,
                video2: true,
                video3: true
            });
        }
    };

    // Проверяем наличие контента
    if (!currentPart || (!currentPart.videoUrl && !currentPart.text &&
        !currentPart.videoUrl_2 && !currentPart.text_2 &&
        !currentPart.videoUrl_3 && !currentPart.text_3 &&
        !currentPart.super_text)) {
        return null;
    }

    const renderPart = (part) => (
        <motion.div
            className="training-content"
            initial="enter"
            animate="center"
            exit="exit"
            variants={slideVariants}
            custom={direction}
            transition={transition}
        >
            {part.super_text && (
                <div className="super-set">
                    <h2>{part.super_text}</h2>
                    <p>{part.super_description}</p>
                </div>
            )}

            {part.videoUrl && (
                <div className="video-section">
                    <div className="videoContainer">
                        {loadingStates.video1 && <Loader />}
                        <iframe
                            src={part.videoUrl}
                            allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
                            frameBorder="0"
                            allowFullScreen
                            title="Видео 1"
                            onLoad={() => handleVideoLoad('video1')}

                        />
                    </div>
                    <p>{part.text}</p>
                </div>
            )}

            {part.videoUrl_2 && (
                <div className="video-section">
                    <div className="videoContainer">
                        {loadingStates.video2 && <Loader />}
                        <iframe
                            src={part.videoUrl_2}
                            allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
                            frameBorder="0"
                            allowFullScreen
                            title="Видео 2"
                            onLoad={() => handleVideoLoad('video2')}
                            style={{ display: loadingStates.video2 ? 'none' : 'block' }}
                        />
                    </div>
                    <p>{part.text_2}</p>
                </div>
            )}

            {part.videoUrl_3 && (
                <div className="video-section">
                    <div className="videoContainer">
                        {loadingStates.video3 && <Loader />}
                        <iframe
                            src={part.videoUrl_3}
                            allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
                            frameBorder="0"
                            allowFullScreen
                            title="Видео 3"
                            onLoad={() => handleVideoLoad('video3')}
                            style={{ display: loadingStates.video3 ? 'none' : 'block' }}
                        />
                    </div>
                    <p>{part.text_3}</p>
                </div>
            )}
        </motion.div>
    );

    return (
        <div className="training-page">
            <h1>{trainingData.title}</h1>

            <div className="training-content-wrapper">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div key={currentPartIndex}>
                        {renderPart(currentPart)}
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className="training-navigation">
                <Button
                    onClick={handleNext}
                    text={isLastPart ? (lectures ? "Изучено" : "Завершить") : "Продолжить"}
                    reverse={isLastPart ? false : true}
                    icon={isLastPart ? (lectures ? brain : check) : arrow}
                    bg={isLastPart ? "#CBFF52" : "#A799FF"}
                    bgFocus={isLastPart ? "#EBFFBD" : "#776CBC"}
                    color={isLastPart ? "#0d0d0d" : "#fff"}
                />
            </div>
        </div>
    );
} 