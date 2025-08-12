import styled from '@emotion/styled';
import { JSX, useState } from 'react';

import backIconSrc from '~/shared/assets/svg/back.svg';
import closeIconSrc from '~/shared/assets/svg/close.svg';
import { NavButton } from '~/shared/ui/molecules/buttons/NavButton';
import { StepProgressBar } from '~/shared/ui/molecules/StepProgressBar';

export function MacrosCalculatorQuizPage(): JSX.Element {
  const [step, setStep] = useState(2);

  const handleBackClick = () => {
    if (step > 1) setStep((prevStep) => prevStep - 1);
  };

  const isBackButtonActive = step > 1;

  return (
    <StyledMacrosCalculatorQuizPage>
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
        <StepProgressBar
          title="Базовый обмен"
          currentStep={step}
          totalSteps={8}
        />

        <div>Quiz</div>
      </StyledContent>
    </StyledMacrosCalculatorQuizPage>
  );
}

const StyledMacrosCalculatorQuizPage = styled.div``;

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

const StyledContent = styled.div`
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
`;
