import styled from '@emotion/styled';
import { JSX, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import chevronLeftIconSrc from '~/shared/assets/svg/chevron-left.svg';
import chevronRightIconSrc from '~/shared/assets/svg/chevron-right.svg';

import { useMeasurements } from '../api/useMeasurements';

const measurementTranslations = {
  weight: 'Вес',
  chest: 'Обхват груди',
  waist: 'Обхват талии',
  abdominalCircumference: 'Обхват живота',
  hips: 'Обхват бёдер',
  legs: 'Обхват ноги',
} as const;

type MeasurementType = keyof typeof measurementTranslations;

const getAdjacentMeasurement = (
  type: MeasurementType,
  direction: 'prev' | 'next',
): string => {
  const keys = Object.keys(measurementTranslations) as MeasurementType[];
  const currentIndex = keys.indexOf(type);
  let adjacentIndex;
  if (direction === 'next') adjacentIndex = (currentIndex + 1) % keys.length;
  else adjacentIndex = (currentIndex - 1 + keys.length) % keys.length;
  return measurementTranslations[keys[adjacentIndex]];
};

export function MeasurementsChart(): JSX.Element {
  const [activeMeasurement, setActiveMeasurement] =
    useState<MeasurementType>('weight');

  const { measurements, isMeasurementsPending } = useMeasurements();

  if (isMeasurementsPending) {
    return <div>Загрузка...</div>;
  }

  const measurementData = measurements
    ?.slice(0, 7)
    .toReversed()
    .map((measurement) => ({
      date: new Date(measurement.createdAt).toLocaleDateString('ru-RU', {
        month: 'short',
        day: 'numeric',
      }),
      weight: measurement.weight,
      chest: measurement.chest,
      waist: measurement.waist,
      abdominalCircumference: measurement.abdominalCircumference,
      legs: measurement.legs,
      hips: measurement.hips,
    }));

  const hasNoMeasurements = !measurementData || measurementData.length === 0;

  const handleMeasurementChange = (direction: 'prev' | 'next') => {
    const keys = Object.keys(measurementTranslations) as MeasurementType[];
    const currentIndex = keys.indexOf(activeMeasurement);
    let nextIndex;
    if (direction === 'next') nextIndex = (currentIndex + 1) % keys.length;
    else nextIndex = (currentIndex - 1 + keys.length) % keys.length;
    setActiveMeasurement(keys[nextIndex]);
  };

  return (
    <StyledChartContainer>
      <StyledTitle>Мои замеры</StyledTitle>

      {hasNoMeasurements && (
        <StyledEmptyChart>
          Запишите замеры, чтобы начать отслеживать прогресс
        </StyledEmptyChart>
      )}

      {!hasNoMeasurements && (
        <StyledChart style={{ width: '100%', height: 148 }}>
          <ResponsiveContainer>
            <AreaChart
              data={measurementData}
              margin={{ top: 5, right: 0, left: -32, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A799FF" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#A799FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#EDEDF2" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                dy={10}
                tick={{ fill: '#878787', fontSize: 10, fontWeight: 500 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                domain={['dataMin - 2', 'dataMax + 2']}
                tick={{ fill: '#878787', fontSize: 10, fontWeight: 600 }}
              />
              <Area
                type="linear"
                stroke="#A799FF"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorUv)"
                dataKey={activeMeasurement}
                dot={({ cx, cy, stroke }) => (
                  <circle cx={cx} cy={cy} r={5} fill={stroke} />
                )}
                activeDot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </StyledChart>
      )}
      <StyledControls>
        <StyledAdjacentMeasurementLeft>
          {getAdjacentMeasurement(activeMeasurement, 'prev')}
        </StyledAdjacentMeasurementLeft>
        <StyledMainControl>
          <StyledArrowButton onClick={() => handleMeasurementChange('prev')}>
            <img src={chevronLeftIconSrc} />
          </StyledArrowButton>
          <StyledCurrentMeasurement>
            {measurementTranslations[activeMeasurement]}
          </StyledCurrentMeasurement>
          <StyledArrowButton onClick={() => handleMeasurementChange('next')}>
            <img src={chevronRightIconSrc} />
          </StyledArrowButton>
        </StyledMainControl>
        <StyledAdjacentMeasurementRight>
          {getAdjacentMeasurement(activeMeasurement, 'next')}
        </StyledAdjacentMeasurementRight>
      </StyledControls>
    </StyledChartContainer>
  );
}

const StyledChartContainer = styled.div``;

const StyledTitle = styled.h2`
  margin-bottom: 12px;

  color: #0d0d0d;
  font-size: 18px;
  font-weight: 700;
  line-height: 120%;
`;

const StyledEmptyChart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 148px;

  text-align: center;
  color: #8b8b9f;
  font-size: 14px;
  font-weight: 500;
  line-height: 120%;
`;

const StyledChart = styled.div`
  margin-bottom: 20px;
`;

const StyledControls = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 20px;
`;

const StyledMainControl = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 10px 12px;
  border-radius: 50px;

  background-color: #f2f1ff;
`;

const StyledCurrentMeasurement = styled.span`
  text-align: center;
  color: #59539e;
  font-size: 14px;
  font-weight: 600;
  line-height: 120%;
`;

const StyledAdjacentMeasurement = styled.span`
  padding: 0 12px;

  color: rgba(89, 83, 158, 0.5);
  font-size: 12px;
  font-weight: 600;
  line-height: 120%;
`;

const StyledAdjacentMeasurementLeft = styled(StyledAdjacentMeasurement)`
  justify-self: start;
`;

const StyledAdjacentMeasurementRight = styled(StyledAdjacentMeasurement)`
  justify-self: end;
`;

const StyledArrowButton = styled.button`
  display: flex;
`;
