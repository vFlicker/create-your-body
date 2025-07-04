import { Measurements } from '../measurementTypes';
import {
  DeltaDirection,
  getDeltaDirection,
  signIndicator,
} from './getDeltaDirection';

type MeasurementRow = {
  title: string;
  unit: string;
  value?: number;
  delta?: string;
  deltaDirection?: DeltaDirection;
};

type MeasurementKey = keyof typeof measurement;

const measurement = {
  chest: {
    title: 'Обхват груди',
    unit: 'см',
  },
  waist: {
    title: 'Обхват талии',
    unit: 'см',
  },
  abdominalCircumference: {
    title: 'Обхват живота',
    unit: 'см',
  },
  legs: {
    title: 'Обхват ноги',
    unit: 'см',
  },
  hips: {
    title: 'Обхват бедер',
    unit: 'см',
  },
  weight: {
    title: 'Вес',
    unit: 'кг',
  },
};

export const calculateMeasurementsChange = (
  measurements: Measurements[],
): MeasurementRow[] => {
  const measurementChanges: MeasurementRow[] = [];

  const mostRecentMeasurement = measurements[0];
  const hasTwoMeasurements = measurements.length > 2;

  if (hasTwoMeasurements) {
    const secondToLastMeasurements = measurements[1];

    for (const key of Object.keys(measurement) as MeasurementKey[]) {
      const value = mostRecentMeasurement[key];
      const previousValue = secondToLastMeasurements[key];
      const delta = value - previousValue;
      const deltaDirection = getDeltaDirection(delta);
      const sign = signIndicator[deltaDirection];

      measurementChanges.push({
        ...measurement[key],
        value,
        delta: `${sign}${Math.abs(delta)}`,
        deltaDirection,
      });
    }

    return measurementChanges;
  }

  for (const key of Object.keys(measurement) as MeasurementKey[]) {
    const value = mostRecentMeasurement[key];
    measurementChanges.push({
      ...measurement[key],
      value,
      delta: '0',
      deltaDirection: 'noChange',
    });
  }

  return measurementChanges;
};
