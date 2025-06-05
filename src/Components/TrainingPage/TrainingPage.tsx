import './TrainingPage.css';

import { useCallback, useEffect, useRef, useState } from 'react';

import arrowIconSrc from '~/shared/assets/svg/arrow.svg';
import backIconSrc from '~/shared/assets/svg/arrowBack.svg';
import brainIconSrc from '~/shared/assets/svg/brain.svg';
import checkIconSrc from '~/shared/assets/svg/check.svg';
import { Button } from '~/shared/ui/Button';
import { Notification } from '~/shared/ui/Notification';

export default function TrainingPage({ trainingData, onBack, lectures, jcsb }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isBonus, setIsBonus] = useState(false);
  const contentRef = useRef(null);

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

  const currentStep = lectures ? trainingData : trainingData[currentStepIndex];
  const isLastStep = lectures
    ? true
    : currentStepIndex === trainingData.length - 1;

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
      {!lectures && (
        <Notification>
          <p>Когда закончишь - долистай до конца для продолжения тренировки</p>
        </Notification>
      )}

      <div className="training-content-wrapper">
        <div className="training-content">
          {lectures
            ? currentStep?.blocks?.map((block, index) => (
                <div key={block._id || index}>{renderBlock(block)}</div>
              ))
            : currentStep?.blocks?.map((block, index) => (
                <div key={block._id || index}>{renderBlock(block)}</div>
              ))}
        </div>
      </div>

      <div className="training-navigation">
        <Button iconSrc={backIconSrc} color="secondary" onClick={handleBack}>
          Назад
        </Button>
        <Button
          iconSrc={
            isLastStep ? (lectures ? brainIconSrc : checkIconSrc) : arrowIconSrc
          }
          color={isLastStep ? 'secondary' : 'accent'}
          onClick={handleNext}
        >
          {isLastStep ? (lectures ? 'Изучено' : 'Завершить') : 'Продолжить'}
        </Button>
      </div>
    </div>
  );
}
