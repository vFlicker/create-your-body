import styled from '@emotion/styled';
import { JSX } from 'react';

export function WorkoutDiaryWidget(): JSX.Element {
  return (
    <StyledMeasurementsWidget>
      <StyledTitle>Дневник тренировок</StyledTitle>
    </StyledMeasurementsWidget>
  );
}

const StyledMeasurementsWidget = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledTitle = styled.h2`
  margin-bottom: 12px;

  color: #0d0d0d;
  font-size: 18px;
  font-weight: 700;
  line-height: 120%;
`;
