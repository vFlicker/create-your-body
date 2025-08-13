import styled from '@emotion/styled';
import { JSX, useState } from 'react';

import backIconSrc from '~/shared/assets/svg/back.svg';
import closeIconSrc from '~/shared/assets/svg/close.svg';
import { NavButton } from '~/shared/ui/molecules/buttons/NavButton';
import { StepProgressBar } from '~/shared/ui/molecules/StepProgressBar';

import { EnterParametersScreen } from './screens/EnterParametersScreen';
import { ParametersResultScreen } from './screens/ParametersResultScreen';

export function BmiCalculatorQuizPage(): JSX.Element {
  const [step, setStep] = useState(2);

  const handleBackClick = () => {
    if (step > 1) setStep((prevStep) => prevStep - 1);
  };

  const handleNextClick = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const isBackButtonActive = step > 1;

  const screens = [
    <EnterParametersScreen key="enter-parameters" onNext={handleNextClick} />,
    <ParametersResultScreen
      key="parameters-result"
      onBack={handleBackClick}
      onNext={handleNextClick}
    />,
  ];

  return (
    <StyledBmiCalculatorQuizPage>
      <StyledHeader>
        <NavButton
          text="Назад"
          iconSrc={backIconSrc}
          disabled={!isBackButtonActive}
          onClick={handleBackClick}
        />

        <StyledPageTitle>Тренажёр по подбору КБЖУ</StyledPageTitle>

        <NavButton iconSrc={closeIconSrc} onClick={handleBackClick} />
      </StyledHeader>

      <StyledContent>
        <StyledStepProgressBar
          title="Базовый обмен"
          currentStep={step}
          totalSteps={8}
        />

        {screens[step - 1]}
      </StyledContent>
    </StyledBmiCalculatorQuizPage>
  );
}

const StyledBmiCalculatorQuizPage = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

const StyledPageTitle = styled.h1`
  color: #7a66ff;
  font-size: 12px;
  font-weight: 600;
  line-height: 120%;
`;

const StyledStepProgressBar = styled(StepProgressBar)`
  padding: 0 16px;
  margin-bottom: 16px;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
