import styled from '@emotion/styled';
import { JSX } from 'react';
import { useParams } from 'react-router-dom';

import { EditMeasurementsForm } from '~/features/measurement/editMeasurements/';
import { formatDateForView } from '~/shared/libs/date';
import { UserPageLayout } from '~/widgets/UserPageLayout';

const mockMeasurements = {
  id: 759,
  userId: 1423,
  reportNumber: 30,
  chest: 3333,
  waist: 3333,
  abdominalCircumference: 3333,
  legs: 3333,
  hips: 3333,
  weight: 3333,
  createdAt: '2025-07-06T15:41:31.352Z',
};

export function EditMeasurementsPage(): JSX.Element {
  const { reportId } = useParams<{ reportId: string }>();

  // const { measurement, isMeasurementPending } = useMeasurementsByReportNumber(reportNumber);
  const measurements = mockMeasurements; // Mock data for demonstration
  const isMeasurementPending = false;

  return (
    <UserPageLayout isLoading={isMeasurementPending}>
      <StyledHeader>
        <StyledTitle>Отчет #{measurements.reportNumber}</StyledTitle>
        <StyledDate>
          {formatDateForView(measurements?.createdAt || '')}
        </StyledDate>
      </StyledHeader>

      <EditMeasurementsForm
        reportId={+reportId!}
        measurements={{
          chest: measurements.chest,
          waist: measurements.waist,
          abdominalCircumference: measurements.abdominalCircumference,
          legs: measurements.legs,
          hips: measurements.hips,
          weight: measurements.weight,
        }}
      />
    </UserPageLayout>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const StyledTitle = styled.h1`
  color: #0d0d0d;
  font-size: 18px;
  font-weight: 700;
`;

const StyledDate = styled.p`
  color: #0d0d0d;
  font-size: 12px;
`;
