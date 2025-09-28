import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { TrainingCard, useWorkoutReports } from '~/entities/workoutDiary';
// import { TrainingCard } from '~/entities/workoutDiary';
import { AppRoute } from '~/shared/router';
import { Button } from '~/shared/ui/atoms/Button';

export function WorkoutDiaryWidget(): JSX.Element {
  const navigate = useNavigate();

  const { workoutReports } = useWorkoutReports();
  const hasTrainings = workoutReports && workoutReports.length > 0;

  return (
    <StyledMeasurementsWidget>
      <StyledTitle>Дневник тренировок</StyledTitle>
      <StyledContentWrapper>
        <StyledListDescription>
          {hasTrainings
            ? 'Последние тренировки'
            : 'Не добавлено ни одной тренировки'}
        </StyledListDescription>
        <StyledTrainingCardList>
          {workoutReports
            ?.slice(0, 2)
            .map((report) => (
              <TrainingCard
                key={report.id}
                id={report.id}
                title={report.name}
                exercisesCount={report.exercises.length}
                date={report.date}
              />
            ))}
        </StyledTrainingCardList>
        <Button
          color="accent"
          variant="outlined"
          onClick={() => navigate(AppRoute.WorkoutDiary)}
        >
          Перейти в дневник
        </Button>
      </StyledContentWrapper>
    </StyledMeasurementsWidget>
  );
}

const StyledMeasurementsWidget = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledTitle = styled.h2`
  color: #0d0d0d;
  font-size: 18px;
  font-weight: 700;
  line-height: 120%;
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 16px;
  border-radius: 10px;
  border: 1px solid #e2e2ea;
`;

const StyledListDescription = styled.div`
  color: #8b8b9f;
  font-size: 12px;
  font-weight: 500;
  line-height: 120%;
`;

const StyledTrainingCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  & > div:not(:last-child) {
    padding-bottom: 12px;
    border-bottom: 1px solid #f0f0f3;
  }
`;
