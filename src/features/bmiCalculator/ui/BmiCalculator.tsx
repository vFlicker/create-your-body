import styled from '@emotion/styled';
import { JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CloseAppButton } from '~/features/CloseAppButton';
import backIconSrc from '~/shared/assets/svg/back.svg';
import { AppRoute } from '~/shared/router';
import { NavButton } from '~/shared/ui/molecules/buttons/NavButton';
import { StepProgressBar } from '~/shared/ui/molecules/StepProgressBar';

import { ChooseActivityScreen } from './screens/chooseActivity';
import { ChooseGoalScreen } from './screens/chooseGoal';
import { EnterParametersScreen } from './screens/enterParameters';
import { ParametersResultScreen } from './screens/parametersResult';
import { SaveResultScreen } from './screens/saveResult';
import { SelectFatScreen } from './screens/selectFat';
import { SelectProteinScreen } from './screens/selectProtein';

export function BmiCalculator(): JSX.Element {
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const handleBackClick = () => {
    if (step > 1) setStep((prevStep) => prevStep - 1);
  };

  const handleNextClick = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleRepeatClick = () => {
    setStep(1);
  };

  const handleFinishClick = () => {
    navigate(AppRoute.Dashboard);
  };

  const isBackButtonActive = step > 1;

  const screens = [
    <EnterParametersScreen key="enter-parameters" onNext={handleNextClick} />,
    <ParametersResultScreen
      key="parameters-result-screen"
      onBack={handleBackClick}
      onNext={handleNextClick}
    />,
    <ChooseActivityScreen
      key="choose-activity-screen"
      onBack={handleBackClick}
      onNext={handleNextClick}
    />,
    <ChooseGoalScreen
      key="choose-goal-screen"
      onBack={handleBackClick}
      onNext={handleNextClick}
    />,
    <SelectProteinScreen
      key="select-protein-screen"
      onBack={handleBackClick}
      onNext={handleNextClick}
    />,
    <SelectFatScreen
      key="select-fat-screen"
      onBack={handleBackClick}
      onNext={handleNextClick}
    />,
    <SaveResultScreen
      key="save-result-screen"
      onRepeat={handleRepeatClick}
      onFinish={handleFinishClick}
    />,
  ];

  return (
    <StyledBmiCalculatorWrapper>
      <StyledHeader>
        <NavButton
          text="Назад"
          iconSrc={backIconSrc}
          disabled={!isBackButtonActive}
          onClick={handleBackClick}
        />

        <StyledPageTitle>Тренажёр по подбору КБЖУ</StyledPageTitle>

        <CloseAppButton />
      </StyledHeader>

      <StyledContent>
        <StyledStepProgressBar
          title="Базовый обмен"
          currentStep={step}
          totalSteps={screens.length}
        />

        {screens[step - 1]}
      </StyledContent>
    </StyledBmiCalculatorWrapper>
  );
}

const StyledBmiCalculatorWrapper = styled.div`
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
