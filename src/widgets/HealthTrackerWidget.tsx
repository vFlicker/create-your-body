import styled from '@emotion/styled';
import { JSX } from 'react';

import { useModalStore } from '~/entities/modal';
import { HealthTracker, nutritionHistoryData } from '~/entities/nutrition';
import { CreateNutritionReportForm } from '~/features/nutrition/createNutritionReport';
import { ShowNutritionHistory } from '~/features/nutrition/showNutritionHistory/ui/ShowNutritionHistory';

export function HealthTrackerWidget(): JSX.Element {
  const { openModal } = useModalStore();

  const handleHealthTrackerButtonClick = () => {
    openModal(<CreateNutritionReportForm />);
  };

  return (
    <StyledHealthTrackerWidget>
      <StyledSectionHeader>
        <StyledSectionTitle>Сегодня</StyledSectionTitle>
        <ShowNutritionHistory
          onHealthTrackerButtonClick={handleHealthTrackerButtonClick}
        />
      </StyledSectionHeader>

      <HealthTracker
        onButtonClick={handleHealthTrackerButtonClick}
        data={nutritionHistoryData[0]}
      />
    </StyledHealthTrackerWidget>
  );
}

const StyledHealthTrackerWidget = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledSectionTitle = styled.h2`
  color: #0d0d0d;
  font-size: 18px;
  font-weight: 700;
  line-height: 120%;
  margin: 0;
`;
