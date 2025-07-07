import styled from '@emotion/styled';
import { JSX, useState } from 'react';

import { MeasurementOverview } from '~/entities/measurement/ui/MeasurementOverview';
import { CreateMeasurementsForm } from '~/features/measurement/createMeasurements';
import alertIconSrc from '~/shared/assets/svg/alert-circle.svg';
import { Modal } from '~/shared/ui/molecules/modal';
import { UserPageLayout } from '~/widgets/layouts/UserPageLayout';

export function CreateMeasurementsPage(): JSX.Element {
  const [showDialogModal, setShowDialogModal] = useState(false);

  const onHowToMeasureClick = () => {
    setShowDialogModal(true);
  };

  return (
    <UserPageLayout isLoading={false}>
      <StyledHeader>
        <StyledTitle>Мои параметры</StyledTitle>
        <StyledHowToMeasureButton onClick={onHowToMeasureClick}>
          <img src={alertIconSrc} />
          <span>Как измерить?</span>
        </StyledHowToMeasureButton>
        <StyledText>
          Чтобы отслеживать прогресс, необходимо в конце каждой недели обновлять
          параметры.
        </StyledText>
      </StyledHeader>

      <CreateMeasurementsForm />

      <Modal isOpen={showDialogModal} onClose={() => setShowDialogModal(false)}>
        <MeasurementOverview />
      </Modal>
    </UserPageLayout>
  );
}

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
`;

const StyledTitle = styled.h1`
  color: #0d0d0d;
  font-size: 18px;
  font-weight: 700;
`;

const StyledHowToMeasureButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;

  span {
    text-decoration: underline;
    color: #878787;
    font-size: 11px;
    font-weight: 600;
  }
`;

const StyledText = styled.p`
  grid-column: 1 / -1;

  color: #0d0d0d;
  font-size: 12px;
`;
