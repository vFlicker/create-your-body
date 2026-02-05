export const dailyReportInputs = [
  [
    {
      name: 'weight',
      label: 'Вес',
      postfix: 'кг',
      decimals: 1,
    },
    {
      name: 'steps',
      label: 'Шаги',
      postfix: 'шагов',
      decimals: 0,
    },
  ],
  [
    {
      name: 'calories',
      label: 'Калорийность',
      postfix: 'ккал',
      decimals: 0,
    },
  ],
  [
    {
      name: 'proteins',
      label: 'Белки',
      postfix: 'г',
      decimals: 1,
    },
    {
      name: 'fats',
      label: 'Жиры',
      postfix: 'г',
      decimals: 1,
    },
    {
      name: 'carbs',
      label: 'Углеводы',
      postfix: 'г',
      decimals: 1,
    },
  ],
] as const;
