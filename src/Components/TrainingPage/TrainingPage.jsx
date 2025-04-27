import './TrainingPage.css';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

// import Loader from '../../Components/Loader/Loader';
import arrow from '../../Assets/svg/arrow.svg';
import back from '../../Assets/svg/arrowBack.svg';
import brain from '../../Assets/svg/brain.svg';
import check from '../../Assets/svg/check.svg';
import Button from '../Button/Button';
import Notification from '../Notification/Notification';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const transition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.3,
};

export default function TrainingPage({ trainingData, onBack, lectures, jcsb }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isBonus, setIsBonus] = useState(false);
  const contentRef = useRef(null);
  const [notice, setNotice] = useState(true);

  console.log(trainingData);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);

  useEffect(() => {
    if (!trainingData) return;

    if (lectures) {
      setIsBonus(false);
      return;
    }

    if (trainingData[currentStepIndex]?.bonus) {
      setIsBonus(true);
    }

    // Инициализируем состояния загрузки для всех видео в текущем шаге
    const newLoadingStates = {};
    trainingData[currentStepIndex]?.blocks?.forEach((block) => {
      if (block.type === 'video') {
        newLoadingStates[block._id] = true;
      }
    });
    // setLoadingStates(newLoadingStates);
  }, [trainingData, currentStepIndex, lectures]);

  useEffect(() => {
    if (contentRef.current && currentStepIndex !== 0) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentStepIndex]);

  const handleNext = useCallback(() => {
    if (!trainingData) return;

    if (lectures || currentStepIndex === trainingData.length - 1) {
      onBack();
    } else {
      setDirection(1);
      setCurrentStepIndex((prev) => prev + 1);
      // Сбрасываем состояния загрузки для нового шага
      const newLoadingStates = {};
      trainingData[currentStepIndex + 1]?.blocks?.forEach((block) => {
        if (block.type === 'video') {
          newLoadingStates[block._id] = true;
        }
      });
      // setLoadingStates(newLoadingStates);
    }
  }, [currentStepIndex, trainingData, onBack, lectures]);

  const handleBack = useCallback(() => {
    if (!trainingData) return;

    if (currentStepIndex > 0) {
      setDirection(-1);
      setCurrentStepIndex((prev) => prev - 1);
      // Сбрасываем состояния загрузки для предыдущего шага
      const newLoadingStates = {};
      trainingData[currentStepIndex - 1]?.blocks?.forEach((block) => {
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

  if (!trainingData) {
    return <div>Загрузка...</div>;
  }

  const currentStep = lectures
    ? trainingData.data
    : trainingData[currentStepIndex];
  const isLastStep = lectures
    ? true
    : currentStepIndex === trainingData.length - 1;
  // const isFirstStep = currentStepIndex === 0;

  const renderBlock = (block) => {
    switch (block.type) {
      case 'text':
        return (
          <div
            className="text-section"
            dangerouslySetInnerHTML={{ __html: block.content.text }}
          />
        );
      case 'video':
        return (
          <div className="video-section">
            <div
              className="videoContainer"
              style={{ aspectRatio: lectures ? '16/9' : '9/16' }}
            >
              <div
                dangerouslySetInnerHTML={{ __html: block.video.embedCode }}
              />
            </div>
          </div>
        );
      case 'divider':
        return block.divider.showLine ? <div className="divider" /> : null;
      default:
        return null;
    }
  };

  return (
    <div
      className="training-page"
      ref={contentRef}
      style={{ justifyContent: jcsb ? 'space-between' : '' }}
    >
      {!lectures && (
        <h1>
          {currentStep.title} {isBonus && 'БОНУС'}
        </h1>
      )}
      {!lectures && notice && (
        <Notification onClose={() => setNotice(false)}>
          <p>Когда закончишь - долистай до конца для продолжения тренировки</p>
        </Notification>
      )}

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
            {lectures
              ? currentStep?.blocks?.map((block, index) => (
                  <div key={block._id || index}>{renderBlock(block)}</div>
                ))
              : currentStep?.blocks?.map((block, index) => (
                  <div key={block._id || index}>{renderBlock(block)}</div>
                ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="training-navigation">
        <Button
          onClick={handleBack}
          text="Назад"
          icon={back}
          bg="#CBFF52"
          bgFocus="#EBFFBD"
          color="#0d0d0d"
          width="100%"
        />
        <Button
          onClick={handleNext}
          text={
            isLastStep ? (lectures ? 'Изучено' : 'Завершить') : 'Продолжить'
          }
          reverse={isLastStep ? false : true}
          icon={isLastStep ? (lectures ? brain : check) : arrow}
          bg={isLastStep ? '#CBFF52' : '#A799FF'}
          bgFocus={isLastStep ? '#EBFFBD' : '#776CBC'}
          color={isLastStep ? '#0d0d0d' : '#fff'}
          width="100%"
        />
      </div>
    </div>
  );
}
