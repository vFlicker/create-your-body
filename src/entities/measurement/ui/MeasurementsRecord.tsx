import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import DownArrowIcon from '~/shared/assets/svg/arrow-narrow-down.svg?react';
import UpArrowIcon from '~/shared/assets/svg/arrow-narrow-up.svg?react';
import MinusIcon from '~/shared/assets/svg/minus.svg?react';
import { formatDateToLocaleRu } from '~/shared/libs/format';
import { AppRoute } from '~/shared/router';
import { EditButton } from '~/shared/ui/molecules/buttons/EditButton';

import { MeasurementRow } from '../libs/calculateMeasurementsHistory';
import { DeltaDirection } from '../libs/getDeltaDirection';

type MeasurementsRecordProps = {
  id: number;
  reportNumber: number;
  date: string;
  measurements: MeasurementRow[];
};

const directionIcon: Record<DeltaDirection, JSX.Element> = {
  up: <UpArrowIcon stroke="#F65C5C" />,
  down: <DownArrowIcon stroke="#00BB13" />,
  same: <MinusIcon stroke="#878787" />,
};

export function MeasurementsRecord({
  id,
  date,
  measurements,
  reportNumber,
}: MeasurementsRecordProps): JSX.Element {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${AppRoute.Measurements}/edit/${id}`);
  };

  return (
    <StyledMeasurementsRecordWrapper>
      <StyledHeader>
        <StyledHeaderTextWrapper>
          <StyledTitle>Отчёт #{reportNumber}</StyledTitle>
          <StyledDate>{formatDateToLocaleRu(date)}</StyledDate>
        </StyledHeaderTextWrapper>
        <EditButton onClick={handleClick} />
      </StyledHeader>
      <StyledList>
        {measurements.map(({ id, title, unit, deltaDirection, value }) => (
          <StyledItem key={title + id}>
            <StyledRecordTitle>{title}</StyledRecordTitle>
            <StyledRecord>
              {value}
              <span>{unit}</span>
              {directionIcon[deltaDirection]}
            </StyledRecord>
          </StyledItem>
        ))}
      </StyledList>
    </StyledMeasurementsRecordWrapper>
  );
}

const StyledMeasurementsRecordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;

  padding: 14px 16px;

  border: 1px solid #e2e2ea;
  border-radius: 10px;
`;

const StyledHeader = styled.div`
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -13px;

    width: 100%;
    height: 1px;

    background-color: #f0f0f3;
  }
`;

const StyledHeaderTextWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledTitle = styled.h3`
  position: relative;

  color: #0d0d0d;
  font-size: 14px;
  font-weight: 600;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: -11px;

    width: 1px;
    height: 16px;

    background-color: #f0f0f3;
  }
`;

const StyledDate = styled.div`
  color: #8b8b9f;
  font-size: 12px;
  font-weight: 500;
`;

const StyledList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px 10px;
`;

const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 6px;
`;

const StyledRecordTitle = styled.p`
  text-transform: uppercase;
  color: #878787;
  font-size: 10px;
  font-weight: 600;
`;

const StyledRecord = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  text-transform: uppercase;
  color: #0d0d0d;
  font-size: 14px;
  font-weight: 600;

  span {
    color: #878787;
    font-size: 11px;
  }
`;
