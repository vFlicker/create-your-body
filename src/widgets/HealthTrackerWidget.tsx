import styled from '@emotion/styled';
import { JSX } from 'react';

import { useModalStore } from '~/entities/modal';
import { HealthTracker } from '~/entities/nutrition';
import { CreateNutritionReportForm } from '~/features/nutrition/createNutritionReport';

export function HealthTrackerWidget(): JSX.Element {
  const { openModal } = useModalStore();

  const handleHealthTrackerButtonClick = () => {
    openModal(<CreateNutritionReportForm />);
  };

  const handleHistoryClick = () => {
    openModal(
      <StyledHistoryContent>
        <h2>Мои показатели</h2>
        <p>Сегодня</p>

        <HealthTracker
          onButtonClick={handleHealthTrackerButtonClick}
          data={{
            weight: 55.4,
            steps: 12000,
            calories: 2500,
            proteins: 150,
            fats: 70,
            carbohydrates: 300,
          }}
        />

        <div>Список записів</div>
      </StyledHistoryContent>,
    );
  };

  return (
    <StyledHealthTrackerWidget>
      <StyledSectionHeader>
        <StyledSectionTitle>Сегодня</StyledSectionTitle>
        <StyledHistoryButton onClick={handleHistoryClick}>
          История
        </StyledHistoryButton>
      </StyledSectionHeader>

      <HealthTracker
        onButtonClick={handleHealthTrackerButtonClick}
        data={{
          weight: 55.4,
          steps: 12000,
          calories: 2500,
          proteins: 150,
          fats: 70,
          carbohydrates: 300,
        }}
      />
    </StyledHealthTrackerWidget>
  );
}

const StyledHealthTrackerWidget = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledHistoryButton = styled.button`
  color: #7a66ff;
  font-size: 14px;
  font-weight: 600;
  line-height: 120%;
  background: none;
  border: none;
  cursor: pointer;
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

const StyledHistoryContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
