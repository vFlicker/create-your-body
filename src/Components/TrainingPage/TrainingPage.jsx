import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TrainingPage.css';
import Button from '../Button/Button';
// import Loader from '../../Components/Loader/Loader';

import arrow from '../../Assets/svg/arrow.svg'
import back from '../../Assets/svg/arrowBack.svg'
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

export default function TrainingPage({ trainingData, onBack, lectures }) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    // const [loadingStates, setLoadingStates] = useState({});
    // const [isLoading, setIsLoading] = useState(true);
    const [isBonus, setIsBonus] = useState(false);
    const contentRef = useRef(null);
    
    console.log(trainingData)

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    }, []);

    useEffect(() => {
        // if (!trainingData || !Array.isArray(trainingData)) {
        //     setIsLoading(true);
        //     return;
        // }

        if (trainingData[currentStepIndex]?.bonus) {
            setIsBonus(true);
        }

        // Инициализируем состояния загрузки для всех видео в текущем шаге
        const newLoadingStates = {};
        trainingData[currentStepIndex]?.blocks?.forEach(block => {
            if (block.type === 'video') {
                newLoadingStates[block._id] = true;
            }
        });
        // setLoadingStates(newLoadingStates);

    }, [trainingData, currentStepIndex]);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [currentStepIndex]);

    
    

    const handleNext = useCallback(() => {
        if (lectures || currentStepIndex === trainingData.length - 1) {
            onBack();
        } else {
            setDirection(1);
            setCurrentStepIndex(prev => prev + 1);
            // Сбрасываем состояния загрузки для нового шага
            const newLoadingStates = {};
            trainingData[currentStepIndex + 1]?.blocks?.forEach(block => {
                if (block.type === 'video') {
                    newLoadingStates[block._id] = true;
                }
            });
            // setLoadingStates(newLoadingStates);
        }
    }, [currentStepIndex, trainingData, onBack, lectures]);

    const handleBack = useCallback(() => {
        if (currentStepIndex > 0) {
            setDirection(-1);
            setCurrentStepIndex(prev => prev - 1);
            // Сбрасываем состояния загрузки для предыдущего шага
            const newLoadingStates = {};
            trainingData[currentStepIndex - 1]?.blocks?.forEach(block => {
                if (block.type === 'video') {
                    newLoadingStates[block._id] = true;
                }
            });
            // setLoadingStates(newLoadingStates);
        } else {
            onBack();
        }
    }, [currentStepIndex, trainingData, onBack]);

    useEffect(() => {
        if (currentStepIndex > 0) {
            window.handleBack = handleBack;
            document.body.setAttribute('data-handle-back', 'true');
        } else {
            window.handleBack = null;
            document.body.removeAttribute('data-handle-back');
        }

        return () => {
            window.handleBack = null;
            document.body.removeAttribute('data-handle-back');
        };
    }, [currentStepIndex, handleBack]);

    // if (isLoading || !trainingData || !Array.isArray(trainingData) || !trainingData[currentStepIndex]) {
    //     return null;
    // }

    const currentStep = trainingData[currentStepIndex];
    const isLastStep = lectures ? true : currentStepIndex === trainingData.length - 1;
    // const isFirstStep = currentStepIndex === 0;

    const renderBlock = (block) => {
        switch (block.type) {
            case 'text':
                return (
                    <div className="text-section" dangerouslySetInnerHTML={{ __html: block.content.text }} />
                );
            case 'video':
                return (
                    <div className="video-section">
                        <div className="videoContainer">
                            <div dangerouslySetInnerHTML={{ __html: block.video.embedCode }} />
                        </div>
                    </div>
                );
            case 'divider':
                return block.divider.showLine ? <div className="divider" /> : null;
            default:
                return null;
        }
    };

    const renderLegacyContent = () => {
        
        if (!trainingData?.profi?.[0]) return null;
        
        const item = trainingData.profi[0];
        return (
            <div className="legacy-content">
                {item.videoUrl && (
                    <div className="video-section">
                        <div className="videoContainer" style={{aspectRatio: lectures ? '16/9' : '9/16'}}>
                            <iframe
                                src={item.videoUrl}
                                allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
                                frameBorder="0"
                                allowFullScreen
                                title="Видео"
                            />
                        </div>
                    </div>
                )}
                {item.text && (
                    <div className="text-section" dangerouslySetInnerHTML={{ __html: item.text.replace(/\n/g, '<br/>') }} />
                )}
            </div>
        );
    };

    return (
        <div className="training-page" ref={contentRef}>
            {!lectures && <h1>{currentStep.title} {isBonus && 'БОНУС'}</h1>}

            <div className="training-content-wrapper">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentStepIndex}
                        className="training-content"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={transition}
                    >
                        {lectures ? (
                            renderLegacyContent()
                        ) : (
                            currentStep.blocks?.map((block, index) => (
                                <div key={block._id || index}>
                                    {renderBlock(block)}
                                </div>
                            ))
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="training-navigation">
                <Button 
                    onClick={handleBack}
                    text='Назад'
                    icon={back}
                    bg='#CBFF52'
                    bgFocus='#EBFFBD'
                    color='#0d0d0d'
                    width='100%'
                />
                <Button
                    onClick={handleNext}
                    text={isLastStep ? (lectures ? "Изучено" : "Завершить") : "Продолжить"}
                    reverse={isLastStep ? false : true}
                    icon={isLastStep ? (lectures ? brain : check) : arrow}
                    bg={isLastStep ? "#CBFF52" : "#A799FF"}
                    bgFocus={isLastStep ? "#EBFFBD" : "#776CBC"}
                    color={isLastStep ? "#0d0d0d" : "#fff"}
                    width='100%'
                />
            </div>
        </div>
    );
} 