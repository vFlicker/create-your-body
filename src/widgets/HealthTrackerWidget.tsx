import styled from '@emotion/styled';
import { JSX, useState } from 'react';

import { HealthTracker } from '~/entities/nutrition';
import { CreateNutritionReportForm } from '~/features/nutrition/createNutritionReport/ui/CreateNutritionReportForm';
import {
  DialogStack,
  DialogStackBody,
  DialogStackContent,
  DialogStackOverlay,
} from '~/shared/ui/molecules/dialogStack';

export function HealthTrackerWidget(): JSX.Element {
  // Простий діалог для редагування
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const handleUpdateClick = () => {
    setIsEditFormOpen(true);
  };

  return (
    <StyledHealthTrackerWidget>
      <HealthTracker
        onButtonClick={handleUpdateClick}
        data={{
          weight: 55.4,
          steps: 12000,
          calories: 2500,
          proteins: 150,
          fats: 70,
          carbohydrates: 300,
        }}
      />

      {/* Простий діалог з формою редагування */}
      <DialogStack open={isEditFormOpen} onOpenChange={setIsEditFormOpen}>
        <DialogStackOverlay />
        <DialogStackBody>
          <DialogStackContent>
            <div>
              <h2>Добавить отчет</h2>
              <p>Обновите ваши показатели</p>
            </div>

            <FormContent>
              <CreateNutritionReportForm />
            </FormContent>

            <div>
              <SaveButton>Сохранить</SaveButton>
            </div>
          </DialogStackContent>
        </DialogStackBody>
      </DialogStack>
    </StyledHealthTrackerWidget>
  );
}

const StyledHealthTrackerWidget = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FormContent = styled.div`
  margin: 16px 0;
`;

const SaveButton = styled.button`
  padding: 12px 24px;
  background: #7a66ff;
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #6854e6;
  }
`;
