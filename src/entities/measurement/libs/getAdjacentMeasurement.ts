import { MeasurementType } from '../measurementTypes';

const measurementTranslations: Record<MeasurementType, string> = {
  weight: 'Вес',
  chest: 'Обхват груди',
  waist: 'Обхват талии',
  abdominalCircumference: 'Обхват живота',
  hips: 'Обхват бёдер',
  legs: 'Обхват ноги',
} as const;

export const getAdjacentMeasurementKey = (
  type: MeasurementType,
  direction: 'prev' | 'next',
): MeasurementType => {
  const keys = Object.keys(measurementTranslations) as MeasurementType[];
  const currentIndex = keys.indexOf(type);

  let adjacentIndex: number;

  if (direction === 'next') adjacentIndex = (currentIndex + 1) % keys.length;
  else adjacentIndex = (currentIndex - 1 + keys.length) % keys.length;

  return keys[adjacentIndex];
};

export const getAdjacentMeasurement = (
  type: MeasurementType,
  direction: 'prev' | 'next',
): string => {
  const key = getAdjacentMeasurementKey(type, direction);
  return measurementTranslations[key];
};

export const getCurrentMeasurement = (type: MeasurementType): string => {
  return measurementTranslations[type];
};
