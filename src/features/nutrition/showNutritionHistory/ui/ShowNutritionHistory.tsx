import styled from '@emotion/styled';
import { JSX } from 'react';

import { useModalStore } from '~/entities/modal';
import {
  HealthTracker,
  nutritionHistoryData,
  NutritionHistoryItem,
} from '~/entities/nutrition';
import EditIcon from '~/shared/assets/svg/pencil.svg?react';

type ShowNutritionHistoryProps = {
  onHealthTrackerButtonClick: () => void;
};

export function ShowNutritionHistory({
  onHealthTrackerButtonClick,
}: ShowNutritionHistoryProps): JSX.Element {
  const { openModal } = useModalStore();

  const handleButtonClick = () => {
    openModal(
      <StyledHistoryContent>
        <StyledTitle>Мои показатели</StyledTitle>

        <StyledHealthTrackerWrapper>
          <StyledSubtitle>Сегодня</StyledSubtitle>

          <HealthTracker
            onButtonClick={onHealthTrackerButtonClick}
            data={nutritionHistoryData[0]}
          />
        </StyledHealthTrackerWrapper>

        <StyledHistoryList>
          {nutritionHistoryData.slice(1).map(({ id, date, ...props }) => (
            <StyledNutritionHistoryItemWrapper key={id}>
              <StyledNutritionHistoryItemHeader>
                <StyledSubtitle>{date}</StyledSubtitle>
                <StyledEditButton>
                  Изменить
                  <EditIcon stroke="#8B8B9F" />
                </StyledEditButton>
              </StyledNutritionHistoryItemHeader>
              <NutritionHistoryItem {...props} />
            </StyledNutritionHistoryItemWrapper>
          ))}
        </StyledHistoryList>
      </StyledHistoryContent>,
    );
  };

  return (
    <StyledHistoryButton onClick={handleButtonClick}>
      История
    </StyledHistoryButton>
  );
}

const StyledHistoryContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.h2`
  margin-bottom: 16px;

  color: #0d0d0d;
  font-size: 18px;
  font-weight: 700;
  line-height: 120%;
`;

const StyledHealthTrackerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  margin-bottom: 20px;
`;

const StyledSubtitle = styled.p`
  color: #8b8b9f;
  font-size: 12px;
  font-weight: 500;
  line-height: 120%;
`;

const StyledHistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledNutritionHistoryItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledNutritionHistoryItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledEditButton = styled.button`
  color: #8b8b9f;
  font-size: 12px;
  font-weight: 500;
  line-height: 120%;
  text-decoration: underline;

  display: flex;
  align-items: center;
  gap: 8px;
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
