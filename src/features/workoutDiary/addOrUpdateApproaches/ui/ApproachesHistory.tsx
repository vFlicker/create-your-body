import styled from '@emotion/styled';
import { JSX } from 'react';

import {
  useApproachesHistory,
  useWorkoutDiaryStore,
} from '~/entities/workoutDiary';
import { Loader } from '~/shared/ui/atoms/Loader';

type ApproachesHistoryProps = {
  className?: string;
  exerciseId: number;
};

export function ApproachesHistory({
  className,
  exerciseId,
}: ApproachesHistoryProps): JSX.Element {
  const { approachesHistory, isApproachesHistoryPending } =
    useApproachesHistory(exerciseId);

  const { setSelectedApproachFromHistory } = useWorkoutDiaryStore();

  const handleApproachClick = (repetitions?: number, weight?: number) => {
    setSelectedApproachFromHistory({ repetitions, weight });
  };

  if (!approachesHistory || isApproachesHistoryPending) return <Loader />;

  return (
    <StyledApproachesHistoryWrapper className={className}>
      <StyledTitle>История выполнения</StyledTitle>

      {approachesHistory.history.map((approachesDay) => (
        <StyledDaysList key={approachesDay.id}>
          {approachesDay.sets.map(({ repetitions, weight }, index) => (
            <StyledDaysItem
              key={index}
              onClick={() => handleApproachClick(repetitions, weight)}
            >
              <StyledApproach>#{index + 1}</StyledApproach>
              <StyledText>
                {weight} кг x {repetitions} повт.
              </StyledText>
              <StyledDate>{approachesDay.date}</StyledDate>
            </StyledDaysItem>
          ))}
        </StyledDaysList>
      ))}
    </StyledApproachesHistoryWrapper>
  );
}

const StyledApproachesHistoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledTitle = styled.h2`
  color: #82829a;
  font-size: 11px;
  font-weight: 500;
  line-height: 120%;
`;

const StyledDaysList = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
`;

const StyledDaysItem = styled.div`
  display: flex;
  align-items: center;

  padding: 18px 10px;

  background-color: #f4f4f6;

  &:not(:last-child) {
    border-bottom: 1px solid #eaeaef;
  }
`;

const StyledApproach = styled.div`
  margin-right: 12px;

  color: #8b8b9f;
  font-size: 12px;
  font-weight: 600;
  line-height: 100%;
`;

const StyledText = styled.div`
  color: #4e4e6b;
  font-size: 12px;
  font-weight: 600;
  line-height: 100%;
`;

const StyledDate = styled.div`
  margin-left: auto;

  color: #8b8b9f;
  font-size: 11px;
  font-weight: 500;
  line-height: 100%;
`;
