export const dailyReportInputs = [
  [
    {
      name: 'weight',
      type: 'number',
      step: 0.1,
      inputMode: 'decimal',
      label: 'Вес',
      postfix: 'кг',
    },
    {
      name: 'steps',
      type: 'number',
      step: 0.1,
      inputMode: 'decimal',
      label: 'Шаги',
      postfix: 'шагов',
    },
  ],
  [
    {
      name: 'calories',
      type: 'number',
      step: 0.1,
      inputMode: 'decimal',
      label: 'Калорийность',
      postfix: 'ккал',
    },
  ],
  [
    {
      name: 'proteins',
      type: 'number',
      step: 0.1,
      inputMode: 'decimal',
      label: 'Белки',
      postfix: 'г',
    },
    {
      name: 'fats',
      type: 'number',
      step: 0.1,
      inputMode: 'decimal',
      label: 'Жиры',
      postfix: 'г',
    },
    {
      name: 'carbs',
      type: 'number',
      step: 0.1,
      inputMode: 'decimal',
      label: 'Углеводы',
      postfix: 'г',
    },
  ],
] as const;
