import { BodyMeasurements } from '../userTypes';

export type DeltaDirection = 'positive' | 'negative' | 'noChange';

type BodyMeasurementChange = {
  title: string;
  unit: string;
  value?: number;
  delta?: number;
  deltaDirection?: DeltaDirection;
};

const userBodyMetrics = {
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

const getDeltaDirection = (delta: number): DeltaDirection => {
  if (delta < 0) return 'negative';
  if (delta > 0) return 'positive';
  return 'noChange';
};

export const calculateBodyMeasurementsChange = (
  measurements: BodyMeasurements[],
): BodyMeasurementChange[] => {
  const bodyMeasurementChanges: BodyMeasurementChange[] = [];

  const mostRecentMeasurement = measurements[0];
  const hasTwoMeasurements = measurements.length > 2;

  if (hasTwoMeasurements) {
    const secondToLastMeasurements = measurements[1];

    for (const key in userBodyMetrics) {
      const value = mostRecentMeasurement[key];
      const previousValue = secondToLastMeasurements[key];
      const delta = value - previousValue;

      bodyMeasurementChanges.push({
        ...userBodyMetrics[key],
        value,
        delta,
        deltaDirection: getDeltaDirection(delta),
      });
    }

    return bodyMeasurementChanges;
  }

  for (const key in userBodyMetrics) {
    const value = mostRecentMeasurement[key];
    bodyMeasurementChanges.push({
      ...userBodyMetrics[key],
      value,
      delta: 0,
      deltaDirection: 'no change',
    });
  }

  return bodyMeasurementChanges;
};
