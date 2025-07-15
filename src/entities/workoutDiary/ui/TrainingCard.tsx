import styled from '@emotion/styled';
import { JSX } from 'react';

import ClockStopWatchIcon from '~/shared/assets/svg/clock-stopwatch.svg?react';
import RefreshIcon from '~/shared/assets/svg/refresh.svg?react';
import { RemoveButton } from '~/shared/ui/molecules/buttons/RemoveButton';

type TrainingCardProps = {
  className?: string;
};

export function TrainingCard({ className }: TrainingCardProps): JSX.Element {
  return (
    <StyledTrainingCard className={className}>
      <StyledContent>
        <StyledTitle>Тренировка</StyledTitle>
        <StyledExercise>
          <ClockStopWatchIcon />5 упражнений
        </StyledExercise>
        <StyledDate>23 июн, пн</StyledDate>
      </StyledContent>
      <StyledActions>
        <RemoveButton onClick={() => {}} />
        <StyledRepeatButton>
          Повторить <RefreshIcon stroke="#867EBD" />
        </StyledRepeatButton>
      </StyledActions>
    </StyledTrainingCard>
  );
}

const StyledTrainingCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledContent = styled.div`
  position: relative;

  padding: 4px 0 4px 16px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background-color: #a799ff;
    border-radius: 20px;
  }
`;

const StyledTitle = styled.div`
  margin-bottom: 6px;

  color: #0d0d0d;
  font-size: 14px;
  font-weight: 600;
  line-height: 120%;
`;

const StyledExercise = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  margin-bottom: 14px;

  color: #8b8b9f;
  font-size: 12px;
  font-weight: 600;
  line-height: 120%;

  stroke: #8b8b9f;
`;

const StyledDate = styled.div`
  color: #8b8b9f;
  font-size: 11px;
  font-weight: 500;
  line-height: 120%;
`;

const StyledActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  gap: 20px;

  padding: 4px 0;
`;

const StyledRepeatButton = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  padding: 6px 10px;
  border-radius: 6px;
  background: #f0f0f6;

  color: #867ebd;
  font-size: 11px;
  font-weight: 600;
  line-height: 120%;
`;
