import styled from '@emotion/styled';
import { JSX } from 'react';

import { HealthTracker } from '~/entities/nutrition';
import { CreateNutritionReportForm } from '~/features/nutrition/createNutritionReport';
import {
  DialogStack,
  DialogStackBody,
  DialogStackContent,
  DialogStackOverlay,
  DialogStackPrevious,
  useDialogStack,
} from '~/shared/ui/molecules/dialogStack';

export function HealthTrackerHistoryButton(): JSX.Element {
  const historyDialog = useDialogStack(2);

  const handleHistoryClick = () => {
    historyDialog.open(0);
  };

  return (
    <>
      <StyledHistoryButton onClick={handleHistoryClick}>
        История
      </StyledHistoryButton>

      <DialogStack
        open={historyDialog.isOpen}
        activeIndex={historyDialog.activeIndex}
        onOpenChange={(open) => !open && historyDialog.close()}
        onActiveIndexChange={historyDialog.setActiveIndex}
      >
        <DialogStackOverlay />
        <DialogStackBody>
          {/* Діалог 0: Історія показників */}
          <DialogStackContent>
            <div>
              <h2>Мои показатели</h2>
              <p>История ваших измерений</p>
            </div>

            <HistoryContent>
              <HealthTracker
                onButtonClick={historyDialog.goToNext}
                data={{
                  weight: 55.4,
                  steps: 12000,
                  calories: 2500,
                  proteins: 150,
                  fats: 70,
                  carbohydrates: 300,
                }}
              />
            </HistoryContent>
          </DialogStackContent>

          {/* Діалог 1: Форма редагування з кнопкою "Назад" */}
          <DialogStackContent>
            <div>
              <h2>Добавить отчет</h2>
              <p>Обновите ваши показатели</p>
            </div>

            <FormContent>
              <CreateNutritionReportForm />
            </FormContent>

            <div>
              {historyDialog.canGoBack && (
                <DialogStackPrevious>← Назад</DialogStackPrevious>
              )}
              <SaveButton>Сохранить</SaveButton>
            </div>
          </DialogStackContent>
        </DialogStackBody>
      </DialogStack>
    </>
  );
}

const StyledHistoryButton = styled.button`
  color: #7a66ff;
  font-size: 14px;
  font-weight: 600;
  line-height: 120%;
  background: none;
  border: none;
  cursor: pointer;
`;

const HistoryContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 16px 0;

  p {
    margin: 0 0 8px 0;
    font-size: 14px;
    color: #666;
  }
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
