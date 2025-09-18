export const approachesInputs = {
  cardio: [
    {
      name: 'minutes',
      type: 'number',
      inputMode: 'numeric',
      placeholder: 'Длительность',
      postfix: 'мин',
    },
  ],
  approaches: [
    {
      name: 'repetitions',
      type: 'number',
      inputMode: 'numeric',
      placeholder: 'Повторения',
      postfix: 'раз',
    },
    {
      name: 'weight',
      type: 'number',
      inputMode: 'numeric',
      placeholder: 'Вес снаряда',
      postfix: 'кг',
    },
  ],
} as const;
