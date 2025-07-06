import { Measurements } from '../measurementTypes';
import { DeltaDirection, getDeltaDirection } from './getDeltaDirection';

export type MeasurementRow = {
  id: number;
  title: string;
  unit: string;
  value: number;
  deltaDirection: DeltaDirection;
};

type MeasurementHistoryRecord = {
  createdAt: string;
  reportNumber: number;
  measurementsRows: MeasurementRow[];
};

type MeasurementKey = keyof typeof measurement;

const measurement = {
  weight: {
    title: 'Вес',
    unit: 'кг',
  },
  chest: {
    title: 'Грудь',
    unit: 'см',
  },
  waist: {
    title: 'Талия',
    unit: 'см',
  },
  abdominalCircumference: {
    title: 'Живот',
    unit: 'см',
  },
  hips: {
    title: 'Бёдра',
    unit: 'см',
  },
  legs: {
    title: 'Обхват ноги',
    unit: 'см',
  },
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
      const delta = previousValue !== undefined ? value - previousValue : 0;
      const deltaDirection = getDeltaDirection(delta);

      measurementChanges.push({
        ...measurement[key],
        id: currentMeasurement.id,
        value,
        deltaDirection,
      });
    }

    measurementHistory.push({
      reportNumber: currentMeasurement.reportNumber,
      createdAt: currentMeasurement.createdAt,
      measurementsRows: measurementChanges,
    });
  }

  return measurementHistory.toReversed();
};
