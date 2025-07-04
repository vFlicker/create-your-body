import { BodyMeasurements } from '../measurementTypes';
import {
  DeltaDirection,
  getDeltaDirection,
  signIndicator,
} from './getDeltaDirection';

type BodyMeasurementRow = {
  id: number;
  title: string;
  value?: number;
  delta?: string;
  deltaDirection?: DeltaDirection;
};

type BodyHistoryRecord = {
  createdAt: string;
  bodyMeasurementsRows: BodyMeasurementRow[];
};

type BodyMeasurementKey = keyof typeof userBodyMeasurement;

const userBodyMeasurement = {
  chest: 'Обхват груди:',
  waist: 'Обхват талии:',
  abdominalCircumference: 'Обхват живота:',
  legs: 'Обхват ноги:',
  hips: 'Обхват бедер:',
  weight: 'Вес:',
};

export const calculateBodyMeasurementsHistory = (
  measurements: BodyMeasurements[],
): BodyHistoryRecord[] => {
  const bodyMeasurementHistory: BodyHistoryRecord[] = [];
  const reversedMeasurements = measurements.toReversed();

  for (let index = 0; index < reversedMeasurements.length; index++) {
    const currentMeasurement = reversedMeasurements[index];

    const bodyMeasurementChanges: BodyMeasurementRow[] = [];

    for (const key of Object.keys(
      userBodyMeasurement,
    ) as BodyMeasurementKey[]) {
      const value = currentMeasurement[key];
      let previousValue;
      if (index > 0) previousValue = reversedMeasurements[index - 1][key];
      const delta = previousValue ? value - previousValue : 0;
      const deltaDirection = getDeltaDirection(delta);
      const sign = signIndicator[deltaDirection] || '';

      bodyMeasurementChanges.push({
        id: currentMeasurement.id,
        title: userBodyMeasurement[key],
        value,
        delta: `${sign}${Math.abs(delta)}`,
        deltaDirection,
      });
    }

    bodyMeasurementHistory.push({
      createdAt: currentMeasurement.createdAt,
      bodyMeasurementsRows: bodyMeasurementChanges,
    });
  }

  return bodyMeasurementHistory.toReversed();
};
