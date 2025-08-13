import { BmiStatus } from './bmiTypes';

export const BMI_CATEGORIES = ['Дефицит', 'Норма', 'Избыток', 'Ожирение'];

export const bmiCardConfig = [
  {
    status: BmiStatus.Underweight,
    text: 'Дефицит веса',
    range: { min: 0, max: 18.5 },
  },
  {
    status: BmiStatus.Normal,
    text: 'Нормальный вес',
    range: { min: 18.5, max: 25 },
  },
  {
    status: BmiStatus.Overweight,
    text: 'Избыточный вес',
    range: { min: 25, max: 30 },
  },
  {
    status: BmiStatus.Obese,
    text: 'Ожирение',
    range: { min: 30, max: Infinity },
  },
];
