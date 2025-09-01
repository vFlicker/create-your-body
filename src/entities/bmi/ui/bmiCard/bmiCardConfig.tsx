export const BMI_SCALE_CATEGORIES = ['Дефицит', 'Норма', 'Избыток', 'Ожирение'];

export const enum BmiCardStatus {
  Underweight = 'underweight',
  Normal = 'normal',
  Overweight = 'overweight',
  Obese = 'obese',
}

export const bmiCardConfig = [
  {
    status: BmiCardStatus.Underweight,
    text: 'Дефицит веса',
    range: { min: 0, max: 18.5 },
  },
  {
    status: BmiCardStatus.Normal,
    text: 'Нормальный вес',
    range: { min: 18.5, max: 25 },
  },
  {
    status: BmiCardStatus.Overweight,
    text: 'Избыточный вес',
    range: { min: 25, max: 30 },
  },
  {
    status: BmiCardStatus.Obese,
    text: 'Ожирение',
    range: { min: 30, max: Infinity },
  },
];
