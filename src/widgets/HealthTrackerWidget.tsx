import styled from '@emotion/styled';
import { JSX, useState } from 'react';

import { HealthTracker } from '~/entities/nutrition';
import { CreateNutritionReportForm } from '~/features/nutrition/createNutritionReport/ui/CreateNutritionReportForm';
import {
  DialogStack,
  DialogStackBody,
  DialogStackContent,
  DialogStackDescription,
  DialogStackFooter,
  DialogStackHeader,
  DialogStackNext,
  DialogStackOverlay,
  DialogStackPrevious,
  DialogStackTitle,
  DialogStackTrigger,
} from '~/shared/ui/molecules/dialogStack';

export function HealthTrackerWidget(): JSX.Element {
  const [showDialogModal, setShowDialogModal] = useState(false);

  const handleChangeButtonClick = () => {
    // show form logic can be handled here
  };

  return (
    <StyledHealthTrackerWidget>
      <StyledHeader>
        <StyledTitle>Сегодня</StyledTitle>
        <DialogStack open={showDialogModal} onOpenChange={setShowDialogModal}>
          <DialogStackTrigger asChild>
            <StyledHistoryButton>История</StyledHistoryButton>
          </DialogStackTrigger>
          <DialogStackOverlay />
          <DialogStackBody>
            <DialogStackContent>
              <DialogStackHeader>
                <DialogStackTitle>История измерений</DialogStackTitle>
                <DialogStackDescription>
                  Просмотр и управление вашими измерениями
                </DialogStackDescription>
              </DialogStackHeader>
              <div>
                <p>Здесь будет отображаться история измерений</p>
              </div>
              <DialogStackFooter style={{ justifyContent: 'space-between' }}>
                <button onClick={handleChangeButtonClick}>Добавить</button>
                <DialogStackNext asChild>
                  <button>Подробнее</button>
                </DialogStackNext>
              </DialogStackFooter>
            </DialogStackContent>

            <DialogStackContent>
              <DialogStackHeader>
                <DialogStackTitle>Добавить измерение</DialogStackTitle>
                <DialogStackDescription>
                  Добавьте новые данные о питании
                </DialogStackDescription>
              </DialogStackHeader>
              <div>
                <CreateNutritionReportForm />
              </div>
              <DialogStackFooter>
                <DialogStackPrevious asChild>
                  <button>Назад</button>
                </DialogStackPrevious>
              </DialogStackFooter>
            </DialogStackContent>
          </DialogStackBody>
        </DialogStack>
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
