export const nutritionReportInputs = [
  [
    { name: 'weight', label: 'Вес', postfix: 'кг' },
    { name: 'steps', label: 'Шаги', postfix: 'шагов' },
  ],
  [{ name: 'calories', label: 'Калорийность', postfix: 'ккал' }],
  [
    { name: 'proteins', label: 'Белки', postfix: 'г' },
    { name: 'fats', label: 'Жиры', postfix: 'г' },
    { name: 'carbohydrates', label: 'Углеводы', postfix: 'г' },
  ],
] as const;
