import styled from '@emotion/styled';
import { JSX } from 'react';

import { useModalStore } from '~/entities/modal';
import { useRemoveWorkoutReport } from '~/entities/workoutDiary';
import { useWorkoutReport } from '~/entities/workoutDiary';
import TrashIcon from '~/shared/assets/svg/trash.svg?react';
import { Loader } from '~/shared/ui/atoms/Loader';

type RemoveTrainingProps = {
  id: number;
};

export function RemoveTraining({ id }: RemoveTrainingProps): JSX.Element {
  const { closeModal } = useModalStore();

  const { workoutReport, isWorkoutReportPending } = useWorkoutReport(id);

  const { removeWorkoutReport } = useRemoveWorkoutReport();

  if (!workoutReport || isWorkoutReportPending) {
    return <Loader />;
  }

  const handleRemove = () => {
    removeWorkoutReport({ dto: { id } });
    closeModal();
  };

  return (
    <StyledRemoveTrainingWrapper>
      <StyledTitle>Вы точно хотите удалить «{workoutReport.name}»?</StyledTitle>

      <StyledActionsWrapper>
        <StyledRemoveButton onClick={handleRemove}>
          <TrashIcon stroke="#F65C5C" />
          Да, удалить
        </StyledRemoveButton>
        <StyledCancelButton onClick={closeModal}>
          Нет, оставить
        </StyledCancelButton>
      </StyledActionsWrapper>
    </StyledRemoveTrainingWrapper>
  );
}

const StyledRemoveTrainingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
`;

const StyledTitle = styled.h1`
  color: #0d0d0d;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
`;

const StyledActionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const StyledRemoveButton = styled.button`
  display: flex;
  padding: 20px 32px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  width: 100%;
  border-radius: 50px;

  color: #f65c5c;
  font-size: 14px;
  font-weight: 700;
  line-height: 100%;

  background-color: rgba(246, 92, 92, 0.12);
`;

const StyledCancelButton = styled.button`
  display: flex;
  padding: 20px 32px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  width: 100%;
  border-radius: 50px;

  color: #7a66ff;
  font-size: 14px;
  font-weight: 700;
  line-height: 100%;

  background-color: rgba(167, 153, 255, 0.12);
`;
