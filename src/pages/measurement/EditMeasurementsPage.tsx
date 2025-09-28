import styled from '@emotion/styled';
import { JSX } from 'react';
import { useParams } from 'react-router-dom';

import { useMeasurementsById } from '~/entities/measurement';
import { EditMeasurementsForm } from '~/features/measurement/editMeasurements/';
import { formatDateToLocaleRu } from '~/shared/libs/format';
import { UserPageLayout } from '~/widgets/layouts/UserPageLayout';

export function EditMeasurementsPage(): JSX.Element {
  const { reportId } = useParams<{ reportId: string }>();

  const { measurements, isMeasurementsPending } = useMeasurementsById(
    reportId!,
  );

  if (!measurements || isMeasurementsPending) {
    return <UserPageLayout isLoading={isMeasurementsPending} />;
  }

  return (
    <UserPageLayout isLoading={isMeasurementsPending}>
      <StyledHeader>
        <StyledTitle>Отчет #{measurements.reportNumber}</StyledTitle>
        <StyledDate>
          {formatDateToLocaleRu(measurements?.createdAt || '')}
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
