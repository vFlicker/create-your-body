import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Lectures.css';
import '../../Pages/Train/Train.css';

import TrainBox from '../../Components/TrainBox/TrainBox';
import TrainingPage from '../../Components/TrainingPage/TrainingPage';
import ProfileBtn from '../../Components/ProfileBtn/ProfileBtn';

import book from '../../Assets/svg/book.svg'

const lectures = [
    {
        closed: false,
        week: '1',
        trainings: [
            {
                title: 'Лекция 1',
                profi: [
                    {
                        videoUrl: 'https://kinescope.io/embed/cG3SmEWwqUKfYn22jUT1Mq',
                        text: 'В этой лекции рассказываю о правилах питания и составлении рациона\nРассчитать свою дневную калорийность можно на этих сайтах\nhttps://www.calc.ru/kalkulyator-kalorii.html\nhttps://www.yournutrition.ru/calories/'
                    }
                ],
            },
            {
                title: 'Лекция 2',
                profi: [
                    {
                        videoUrl: 'https://kinescope.io/embed/mYBNBkzf3UbuvFzJVehPEt',
                        text: 'Лекция про дисциплину и как она влияет на результат',
                    }
                ],
            }
        ]
    },
    {
        closed: true,
        week: '2',
        trainings: [
            {
                title: 'Лекция 1',
                profi: [
                    {
                        super_text: 'СУПЕР-СЕТ: Отведение бедер сидя в тренажере+сгибание голени лежа',
                        super_description: 'упражнения выполняются в режиме супер-сэт, т.е. вы выполняете 2 упражнения друг за другом за один подход, только потом отдыхаете\nВремя отдыха между подходами 1.30-2 мин.',
                        videoUrl: 'https://kinescope.io/embed/cHEdN2puartQTL3jYsNAx3',
                        text: 'Отведение бедер сидя в тренажере (сброс веса) 30 повторений, 4 подхода\n1. Выполняем со сбросом веса: ставим максимальный вес, который выполняли в этом тренажере, делаем 10 повторений, сбрасываем вес на 1-2 плитки и делаем снова 10 повторений, еще раз сбрасываем вес на 1-2 плитки и выполняем 10 повторений, все это делаем без отдыха за 1 подход, всего 4 подхода\n2. Спина прижата\n3. Взгляд перед собой, за макушкой тянемся вверх\n4. Сильный живот, поясница зафиксирована\n5. На выдох, отводим бедра в сторону, на вдох медленно возвращаем в исходное положение',
                        videoUrl_2: '',
                        text_2: 'Cгибание голени лежа 12-15 повторений, 4 подхода\n1. Настраиваем тренажер: валик, который находится ближе к стопе, фиксируем так, чтобы в момент сгибания, он не давил в пятки и не заходил на икры.\n2. На выдох, сгибаем голень, подтягиваем валик вверх, стопы расслаблены, на вдох, медленно возвращаем валик вниз, не бросая.\n3. Работаем за счет бицепса бедра (находится под ягодицей), если он не работает, нужно перенастроить тренажер.'
                    }
                ],
            }
        ]
    },
    {
        closed: true,
        week: '3',
        trainings: [
            {
                title: 'Лекция 1',
                profi: [
                    {
                        super_text: 'СУПЕР-СЕТ: Отведение бедер сидя в тренажере+сгибание голени лежа',
                        super_description: 'упражнения выполняются в режиме супер-сэт, т.е. вы выполняете 2 упражнения друг за другом за один подход, только потом отдыхаете\nВремя отдыха между подходами 1.30-2 мин.',
                        videoUrl: 'https://kinescope.io/embed/cHEdN2puartQTL3jYsNAx3',
                        text: 'Отведение бедер сидя в тренажере (сброс веса) 30 повторений, 4 подхода\n1. Выполняем со сбросом веса: ставим максимальный вес, который выполняли в этом тренажере, делаем 10 повторений, сбрасываем вес на 1-2 плитки и делаем снова 10 повторений, еще раз сбрасываем вес на 1-2 плитки и выполняем 10 повторений, все это делаем без отдыха за 1 подход, всего 4 подхода\n2. Спина прижата\n3. Взгляд перед собой, за макушкой тянемся вверх\n4. Сильный живот, поясница зафиксирована\n5. На выдох, отводим бедра в сторону, на вдох медленно возвращаем в исходное положение',
                        videoUrl_2: '',
                        text_2: 'Cгибание голени лежа 12-15 повторений, 4 подхода\n1. Настраиваем тренажер: валик, который находится ближе к стопе, фиксируем так, чтобы в момент сгибания, он не давил в пятки и не заходил на икры.\n2. На выдох, сгибаем голень, подтягиваем валик вверх, стопы расслаблены, на вдох, медленно возвращаем валик вниз, не бросая.\n3. Работаем за счет бицепса бедра (находится под ягодицей), если он не работает, нужно перенастроить тренажер.'
                    }
                ],
            }
        ]
    },
    {
        closed: true,
        week: '4',
        trainings: [
            {
                title: 'Лекция 1',
                profi: [
                    {
                        super_text: 'СУПЕР-СЕТ: Отведение бедер сидя в тренажере+сгибание голени лежа',
                        super_description: 'упражнения выполняются в режиме супер-сэт, т.е. вы выполняете 2 упражнения друг за другом за один подход, только потом отдыхаете\nВремя отдыха между подходами 1.30-2 мин.',
                        videoUrl: 'https://kinescope.io/embed/cHEdN2puartQTL3jYsNAx3',
                        text: 'Отведение бедер сидя в тренажере (сброс веса) 30 повторений, 4 подхода\n1. Выполняем со сбросом веса: ставим максимальный вес, который выполняли в этом тренажере, делаем 10 повторений, сбрасываем вес на 1-2 плитки и делаем снова 10 повторений, еще раз сбрасываем вес на 1-2 плитки и выполняем 10 повторений, все это делаем без отдыха за 1 подход, всего 4 подхода\n2. Спина прижата\n3. Взгляд перед собой, за макушкой тянемся вверх\n4. Сильный живот, поясница зафиксирована\n5. На выдох, отводим бедра в сторону, на вдох медленно возвращаем в исходное положение',
                        videoUrl_2: '',
                        text_2: 'Cгибание голени лежа 12-15 повторений, 4 подхода\n1. Настраиваем тренажер: валик, который находится ближе к стопе, фиксируем так, чтобы в момент сгибания, он не давил в пятки и не заходил на икры.\n2. На выдох, сгибаем голень, подтягиваем валик вверх, стопы расслаблены, на вдох, медленно возвращаем валик вниз, не бросая.\n3. Работаем за счет бицепса бедра (находится под ягодицей), если он не работает, нужно перенастроить тренажер.'
                    }
                ],
            }
        ]
    }
];

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

export default function Lectures({ data, userId, level, user_photo }) {
    const [[page, direction], setPage] = useState([0, 0]);
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [selectedTraining, setSelectedTraining] = useState(null);

    const handleWeekSelect = (weekData) => {
        setSelectedWeek(weekData);
        setPage([1, 1]);
    };

    const handleTrainingSelect = (training) => {
        setSelectedTraining(training);
        setPage([2, 1]);
    };

    const handleBack = () => {
        if (page === 2) {
            setSelectedTraining(null);
            setSelectedWeek(null);
            setPage([0, -1]);
        } else if (page === 1) {
            setSelectedWeek(null);
            setPage([0, -1]);
        } else if (page === 0) {
            window.handleBack = null;
            window.showContent = false;
            window.dispatchEvent(new Event('showContentChange'));
        }
    };

    useEffect(() => {
        window.handleBack = handleBack;
        document.body.setAttribute('data-handle-back', !!handleBack);
        return () => {
            window.handleBack = null;
            document.body.removeAttribute('data-handle-back');
        };
    }, [page]);

    return (
        <div className="lecturesPage">
            <div className="topLectures">
                <ProfileBtn level={level} user_photo={user_photo} />
                <div className="lecturesTitle">
                    <img src={book} alt="Лекции" />
                    <h1>Лекции</h1>
                </div>
            </div>
            <div className="bottomLectures">
                <AnimatePresence initial={false} custom={direction}>
                    {page === 0 && (
                        <motion.div
                            key="weeks"
                            className="weeksScreen"
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={transition}
                        >
                            {lectures?.map((item, index) => {
                                console.log('Week item before TrainBox:', {
                                    week: item.week,
                                    trainingsCount: item.trainings?.length,
                                    trainings: item.trainings
                                });
                                return (
                                    <TrainBox
                                        key={index}
                                        lectures={item}
                                        train_count={item.trainings?.length}
                                        onClick={() => handleWeekSelect(item)}
                                    />
                                );
                            })}
                        </motion.div>
                    )}

                    {page === 1 && selectedWeek && (
                        <motion.div
                            key="trainings"
                            className="trainingsScreen"
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={transition}
                        >
                            <div className="trainingsGrid">
                                {selectedWeek.trainings.map((training, index) => {
                                    console.log('Training item before TrainBox:', {
                                        title: training.title,
                                        profiCount: training.profi?.length,
                                        profi: training.profi
                                    });
                                    return (
                                        <TrainBox
                                            key={index}
                                            lectures={training}
                                            onClick={() => handleTrainingSelect(training)}
                                        />
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {page === 2 && selectedTraining && (
                        <motion.div
                            key="trainingDetails"
                            className="trainingDetailsScreen"
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={transition}
                        >
                            <TrainingPage
                                trainingData={selectedTraining}
                                onBack={handleBack}
                                level='Профи'
                                lectures={true}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
} 