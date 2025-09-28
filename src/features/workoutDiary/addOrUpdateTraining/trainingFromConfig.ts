export const trainingFromInputs = [
  {
    name: 'name',
    type: 'text',
    label: 'Название',
    placeholder: 'Новая тренировка',
    hasMask: false,
    mask: '',
  },
  {
    name: 'date',
    type: 'number',
    label: 'Дата',
    placeholder: 'дд.мм.гггг',
    hasMask: true,
    mask: '__.__.____',
  },
] as const;
