import styled from '@emotion/styled';
import { JSX } from 'react';

import { Loader } from '~/shared/ui/atoms/Loader';

import { useMeasurements } from '../api/useMeasurements';
import { calculateMeasurementsChange } from '../libs/calculateMeasurementsChange';
import { DeltaDirection } from '../libs/getDeltaDirection';

export function MeasurementsTable(): JSX.Element {
  const { measurements, isMeasurementsPending } = useMeasurements();

  if (!measurements || isMeasurementsPending) {
    return <Loader />;
  }

  const record = calculateMeasurementsChange(measurements);

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
