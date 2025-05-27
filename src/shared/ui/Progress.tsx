import styled from '@emotion/styled';

import { Color } from '../theme/colors';

type ProgressProps = {
  label: string;
  steps: number;
  completedSteps: number;
};

export function Progress({ label, steps, completedSteps }: ProgressProps) {
  return (
    <StyledProgressWrapper>
      <StyledProgressInfo>
        <StyledProgressTitle>{label}</StyledProgressTitle>
        <StyledProgressCount>
          {completedSteps}/{steps}
        </StyledProgressCount>
      </StyledProgressInfo>
      <StyledProgressBar value={completedSteps} max={steps} />
    </StyledProgressWrapper>
  );
}

const StyledProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledProgressInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledProgressTitle = styled.div`
  color: ${Color.Black_950};
  font-size: 12px;
`;

const StyledProgressCount = styled.div`
  color: ${Color.Black_950};
  font-size: 12px;
  font-weight: 700;
`;

const StyledProgressBar = styled.progress`
  height: 14px;
  border-radius: 50px;
  background-color: #fff;
  overflow: hidden;
  width: 100%;
  appearance: none;

  &::-webkit-progress-bar {
    background-color: #fff;
    border-radius: 50px;
  }

  &::-webkit-progress-value {
    background-color: ${Color.Green_500};
    border-radius: 50px;
    transition: all 0.15s ease-in-out;
  }

  &::-moz-progress-bar {
    background-color: ${Color.Green_500};
    border-radius: 50px;
  }

  &::-ms-fill {
    background-color: ${Color.Green_500};
    border-radius: 50px;
  }
`;
