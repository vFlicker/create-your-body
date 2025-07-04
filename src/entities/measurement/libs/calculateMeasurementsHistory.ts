import { Measurements } from '../measurementTypes';
import {
  DeltaDirection,
  getDeltaDirection,
  signIndicator,
} from './getDeltaDirection';

type MeasurementRow = {
  id: number;
  title: string;
  value?: number;
  delta?: string;
  deltaDirection?: DeltaDirection;
};

type MeasurementHistoryRecord = {
  createdAt: string;
  measurementsRows: MeasurementRow[];
};

type MeasurementKey = keyof typeof measurement;

const measurement = {
  chest: 'Обхват груди:',
  waist: 'Обхват талии:',
  abdominalCircumference: 'Обхват живота:',
  legs: 'Обхват ноги:',
  hips: 'Обхват бедер:',
  weight: 'Вес:',
};

export const calculateMeasurementsHistory = (
  measurements: Measurements[],
): MeasurementHistoryRecord[] => {
  const measurementHistory: MeasurementHistoryRecord[] = [];
  const reversedMeasurements = measurements.toReversed();

  for (let index = 0; index < reversedMeasurements.length; index++) {
    const currentMeasurement = reversedMeasurements[index];

    const measurementChanges: MeasurementRow[] = [];

    for (const key of Object.keys(measurement) as MeasurementKey[]) {
      const value = currentMeasurement[key];
      let previousValue;
      if (index > 0) previousValue = reversedMeasurements[index - 1][key];
      const delta = previousValue ? value - previousValue : 0;
      const deltaDirection = getDeltaDirection(delta);
      const sign = signIndicator[deltaDirection] || '';

      measurementChanges.push({
        id: currentMeasurement.id,
        title: measurement[key],
        value,
        delta: `${sign}${Math.abs(delta)}`,
        deltaDirection,
      });
    }

    measurementHistory.push({
      createdAt: currentMeasurement.createdAt,
      measurementsRows: measurementChanges,
    });
  }

  return measurementHistory.toReversed();
};
