import styled from '@emotion/styled';
import { JSX } from 'react';

import { MeasurementOverview } from '~/entities/measurement/ui/MeasurementOverview';
import { Modal, useModalStore } from '~/entities/modal';
import { CreateMeasurementsForm } from '~/features/measurement/createMeasurements';
import alertIconSrc from '~/shared/assets/svg/alert-circle.svg';
import { UserPageLayout } from '~/widgets/layouts/UserPageLayout';

export function CreateMeasurementsPage(): JSX.Element {
  const { openModal } = useModalStore();

  return (
    <UserPageLayout isLoading={false}>
      <StyledHeader>
        <StyledTitle>Мои параметры</StyledTitle>
        <StyledHowToMeasureButton
          onClick={() =>
            openModal(
              <Modal>
                <MeasurementOverview />
              </Modal>,
            )
          }
        >
          <img src={alertIconSrc} />
          <span>Как измерить?</span>
        </StyledHowToMeasureButton>
        <StyledText>
          Чтобы отслеживать прогресс, необходимо в конце каждой недели обновлять
          параметры.
        </StyledText>
      </StyledHeader>

      <CreateMeasurementsForm />
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
