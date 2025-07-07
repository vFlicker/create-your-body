import styled from '@emotion/styled';
import { JSX, useState } from 'react';

import { HealthTracker } from '~/entities/nutrition';
import { CreateNutritionReportForm } from '~/features/nutrition/createNutritionReport/ui/CreateNutritionReportForm';
import { Modal } from '~/shared/ui/molecules/modal';

export function HealthTrackerWidget(): JSX.Element {
  const [showDialogModal, setShowDialogModal] = useState(false);

  const handleChangeButtonClick = () => {
    // show form
  };

  return (
    <StyledHealthTrackerWidget>
      <StyledHeader>
        <StyledTitle>Сегодня</StyledTitle>
        <StyledHistoryButton
          onClick={() => setShowDialogModal((prev) => !prev)}
        >
          История
        </StyledHistoryButton>
      </StyledHeader>
      <HealthTracker
        onButtonClick={() => {}}
        data={{
          weight: 55.4,
          steps: 12000,
          calories: 2500,
          proteins: 150,
          fats: 70,
          carbohydrates: 300,
        }}
      />
      <Modal isOpen={showDialogModal} onClose={() => setShowDialogModal(false)}>
        <div>История</div>
        <div>
          <button onClick={handleChangeButtonClick}>Добавить</button>
          <CreateNutritionReportForm />
        </div>
      </Modal>
    </StyledHealthTrackerWidget>
  );
}

const StyledHealthTrackerWidget = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledTitle = styled.h2`
  color: #0d0d0d;
  font-size: 18px;
  font-weight: 700;
  line-height: 120%;
`;

const StyledHistoryButton = styled.button`
  color: #7a66ff;
  font-size: 14px;
  font-weight: 600;
  line-height: 120%;
`;
