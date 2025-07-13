export const dailyReportInputs = [
  [
    { name: 'weight', label: 'Вес', postfix: 'кг' },
    { name: 'steps', label: 'Шаги', postfix: 'шагов' },
  ],
  [{ name: 'calories', label: 'Калорийность', postfix: 'ккал' }],
  [
    { name: 'proteins', label: 'Белки', postfix: 'г' },
    { name: 'fats', label: 'Жиры', postfix: 'г' },
    { name: 'carbs', label: 'Углеводы', postfix: 'г' },
  ],
] as const;
