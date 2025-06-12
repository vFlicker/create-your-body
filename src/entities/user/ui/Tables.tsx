import styled from '@emotion/styled';
import { JSX } from 'react';

import { Loader } from '~/shared/ui/Loader';

import { useBodyMeasurements } from '../api/useBodyMeasurements';
import { useUser } from '../api/useUser';
import { calculateBodyMeasurementsChange } from '../libs/calculateBodyMeasurementsChange';
import { getAgeFromISOString } from '../libs/getAgeFromISOString';
import { DeltaDirection } from '../libs/getDeltaDirection';

const genderLabel = {
  male: 'Мужской',
  female: 'Женский',
};

export function UserDataTable(): JSX.Element {
  const { user, isUserPending } = useUser();

  if (isUserPending) {
    return <Loader />;
  }

  return (
    <StyledTableWrapper>
      <StyledTitle>Общее</StyledTitle>
      <StyledTable>
        <StyledRecord>
          <StyledKey>Возраст</StyledKey>
          <StyledValue>{getAgeFromISOString(user.born_date)}</StyledValue>
        </StyledRecord>

        <StyledRecord>
          <StyledKey>Пол</StyledKey>
          <StyledValue>{genderLabel[user.sex]}</StyledValue>
        </StyledRecord>
      </StyledTable>
    </StyledTableWrapper>
  );
}

export function MeasurementsTable(): JSX.Element {
  const { bodyMeasurements, isBodyMeasurementsPending } = useBodyMeasurements();

  if (isBodyMeasurementsPending) {
    return <Loader />;
  }

  const record = calculateBodyMeasurementsChange(bodyMeasurements);

  return (
    <StyledTableWrapper>
      <StyledTitle>Параметры</StyledTitle>
      <StyledTable>
        {record.map(({ title, unit, delta, deltaDirection, value }) => (
          <StyledRecord key={title}>
            <StyledKey>{title}</StyledKey>
            <StyledValue deltaDirection={deltaDirection}>
              {value}
              <span>
                {delta} {unit}
              </span>
            </StyledValue>
          </StyledRecord>
        ))}
      </StyledTable>
    </StyledTableWrapper>
  );
}

const StyledTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #0d0d0d;
`;

const StyledTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 16px;
`;

const StyledRecord = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  width: 100%;

  padding-bottom: 8px;
  border-bottom: 1px solid #f2f2f2;

  &:last-child,
  &:nth-last-child(2) {
    border-bottom: none;
  }
`;

const StyledKey = styled.p`
  color: #0d0d0d;
  font-size: 12px;
`;

const ValueColor: Record<DeltaDirection, string> = {
  positive: '#547800',
  negative: '#A799FF',
  noChange: '#999999',
};

const StyledValue = styled.p<{ deltaDirection?: DeltaDirection }>`
  font-weight: 700;
  font-size: 18px;
  color: #0d0d0d;

  span {
    margin-left: 8px;

    color: ${({ deltaDirection = 'noChange' }) => ValueColor[deltaDirection]};
    font-size: 12px;
    font-weight: 400;
    line-height: 120%;
  }
`;
