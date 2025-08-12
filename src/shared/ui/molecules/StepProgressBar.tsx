import styled from '@emotion/styled';
import { JSX } from 'react';

type StepProgressBarProps = {
  className?: string;
  title: string;
  currentStep: number;
  totalSteps: number;
};

export function StepProgressBar({
  className,
  title,
  currentStep,
  totalSteps,
}: StepProgressBarProps): JSX.Element {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <StyledStepProgressBarWrapper className={className}>
      <StyledProgressBar>
        <StyledFill style={{ width: `${progress}%` }} />
        <StyledCircle style={{ left: `calc(${progress}%)` }} />
      </StyledProgressBar>

      <StyledContent>
        <StyledText>{title}</StyledText>
        <StyledText>
          Шаг {currentStep} из {totalSteps}
        </StyledText>
      </StyledContent>
    </StyledStepProgressBarWrapper>
  );
}

const StyledStepProgressBarWrapper = styled.div``;

const StyledProgressBar = styled.div`
  position: relative;

  width: 100%;
  height: 6px;
  margin-bottom: 12px;
  border-radius: 20px;

  background-color: #e6e6ed;
`;

const StyledFill = styled.div`
  position: absolute;

  height: 100%;
  border-radius: 20px;

  background-color: #7a66ff;
`;

const StyledCircle = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);

  width: 13px;
  height: 13px;
  border-radius: 50%;

  box-shadow: 0 0 0 4px #f2f2f2;
  background-color: #7a66ff;
`;

const StyledContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledText = styled.div`
  color: #797996;
  font-size: 11px;
  font-weight: 500;
  line-height: 120%;
`;
