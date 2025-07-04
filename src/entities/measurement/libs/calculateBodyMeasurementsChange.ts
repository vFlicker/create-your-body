import { BodyMeasurements } from '../measurementTypes';
import {
  DeltaDirection,
  getDeltaDirection,
  signIndicator,
} from './getDeltaDirection';

type BodyMeasurementRow = {
  title: string;
  unit: string;
  value?: number;
  delta?: string;
  deltaDirection?: DeltaDirection;
};

type BodyMeasurementKey = keyof typeof userBodyMeasurement;

const userBodyMeasurement = {
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

export const calculateBodyMeasurementsChange = (
  measurements: BodyMeasurements[],
): BodyMeasurementRow[] => {
  const bodyMeasurementChanges: BodyMeasurementRow[] = [];

  const mostRecentMeasurement = measurements[0];
  const hasTwoMeasurements = measurements.length > 2;

  if (hasTwoMeasurements) {
    const secondToLastMeasurements = measurements[1];

    for (const key of Object.keys(
      userBodyMeasurement,
    ) as BodyMeasurementKey[]) {
      const value = mostRecentMeasurement[key];
      const previousValue = secondToLastMeasurements[key];
      const delta = value - previousValue;
      const deltaDirection = getDeltaDirection(delta);
      const sign = signIndicator[deltaDirection];

      bodyMeasurementChanges.push({
        ...userBodyMeasurement[key],
        value,
        delta: `${sign}${Math.abs(delta)}`,
        deltaDirection,
      });
    }

    return bodyMeasurementChanges;
  }

  for (const key of Object.keys(userBodyMeasurement) as BodyMeasurementKey[]) {
    const value = mostRecentMeasurement[key];
    bodyMeasurementChanges.push({
      ...userBodyMeasurement[key],
      value,
      delta: '0',
      deltaDirection: 'noChange',
    });
  }

  return bodyMeasurementChanges;
};
