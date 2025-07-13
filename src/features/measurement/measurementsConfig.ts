export const measurementsInputs = [
  { name: 'weight', step: 0.1, label: 'Вес', postfix: 'кг' },
  { name: 'chest', step: undefined, label: 'Грудь', postfix: 'см' },
  { name: 'waist', step: undefined, label: 'Талия', postfix: 'см' },
  {
    name: 'abdominalCircumference',
    step: undefined,
    label: 'Живот',
    postfix: 'см',
  },
  { name: 'hips', step: undefined, label: 'Бёдра', postfix: 'см' },
  { name: 'legs', step: undefined, label: 'Нога', postfix: 'см' },
] as const;
