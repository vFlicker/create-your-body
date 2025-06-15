import styled from '@emotion/styled';
import { JSX, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useTrainingDetailsById } from '~/entities/training';
import arrowIconSrc from '~/shared/assets/svg/arrow.svg';
import backIconSrc from '~/shared/assets/svg/arrowBack.svg';
import checkIconSrc from '~/shared/assets/svg/check.svg';
import musclesIconSrc from '~/shared/assets/svg/musclesBlack.svg';
import { AppRoute } from '~/shared/router';
import { blockComponents } from '~/shared/ui/blockComponents';
import { Button } from '~/shared/ui/Button';
import { Notification } from '~/shared/ui/Notification';
import { CommonPageLayout } from '~/widgets/CommonPageLayout';

import { pageTitle } from './trainingPlaceConfig';

export function TrainingPlaceDetailsPage(): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const { trainingDetails, isTrainingDetailsPending } =
    useTrainingDetailsById(id);

  const { type, week, steps } = trainingDetails || {};

  const showPreviousPage = (): void => {
    navigate(`${AppRoute.TrainingPlace}/${type}/${week}`);
  };

  const handleNextClick = () => {
    const isLastStep = currentStepIndex === steps.length - 1;
    if (isLastStep) showPreviousPage();
    else setCurrentStepIndex((prev) => prev + 1);
  };

  const handleBack = () => {
    const isFirstStep = currentStepIndex === 0;
    if (isFirstStep) showPreviousPage();
    else setCurrentStepIndex((prev) => prev - 1);
  };

  const currentStep = steps?.[currentStepIndex];
  const isLastStep = currentStepIndex === steps?.length - 1;

  return (
    <CommonPageLayout
      title={pageTitle[trainingDetails?.type]}
      iconSrc={musclesIconSrc}
      isLoading={isTrainingDetailsPending}
    >
      <StyledTrainingPlaceDetailsPageWrapper>
        <StyledTitle>{currentStep?.title}</StyledTitle>

        <Notification>
          Когда закончишь - долистай до конца для продолжения тренировки
        </Notification>

        {currentStep?.blocks?.map(({ _id, type, video, content }) => {
          const BlockComponent = blockComponents[type];
          return (
            <BlockComponent
              key={_id}
              text={content?.text}
              embedCode={video?.embedCode}
            />
          );
        })}

        <StyledButtonsWrapper>
          <Button iconSrc={backIconSrc} color="secondary" onClick={handleBack}>
            Назад
          </Button>
          <Button
            iconSrc={isLastStep ? checkIconSrc : arrowIconSrc}
            iconPosition="right"
            color={isLastStep ? 'secondary' : 'accent'}
            onClick={handleNextClick}
          >
            {isLastStep ? 'Завершить' : 'Продолжить'}
          </Button>
        </StyledButtonsWrapper>
      </StyledTrainingPlaceDetailsPageWrapper>
    </CommonPageLayout>
  );
}

const StyledTrainingPlaceDetailsPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledTitle = styled.h1`
  color: #0d0d0d;
  font-size: 18px;
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
